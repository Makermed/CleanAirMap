import { ApolloServer } from "@apollo/server";
import { schema } from "../schema";
import { Context } from "../context"
import { TestAdaptor } from "../../dataAccess/adaptors/testAdaptor/adaptor";
import { NexusGenInputs } from "../../../nexus-typegen";
import assert from 'assert';
import * as testSetup from './__test_setup'
import { queryForSingleResult } from './__query_helper';

const testServer = new ApolloServer<Context>({schema})

const testContext = {
    db: new TestAdaptor()
}

describe("locations query field", () => {
  testSetup.mockLocationDAO(testContext.db);

  it('fetches a single location, no rooms', async() => {

    const result = await queryForSingleResult(testServer, LOCATION_NO_ROOMS_QUERY, { locationId: 1}, testContext);

    expect(result.errors).toBeUndefined();
    assert(result.data != null);
    expect(result.data.locations).toMatchSnapshot();

  })

  it('fetches a single location\'s rooms', async() => {
    const result = await queryForSingleResult(testServer, SINGLE_LOCATION_WITH_ROOMS_QUERY, { locationId: 1 }, testContext);
    expect(result.errors).toBeUndefined();
    expect(result.data).not.toBeNull();
    expect(result.data?.locations).toMatchSnapshot();
  })

  it('fetches multiple locations', async() => {
    const result = await queryForSingleResult(testServer, LOCATION_NO_ROOMS_QUERY, { locationId: null }, testContext);
    expect(result.errors).toBeUndefined();
    expect(result.data).not.toBeNull();
    expect(result.data?.locations).toMatchSnapshot();
  })

  it('stores a new location' , async () => {
    const locationIn : NexusGenInputs["LocationInputType"] = {
      type: 'Feature',
      geometry: { coordinates: [-86.9259644,43.4708553] },
      properties: {
        name: 'Create location test',
        feature_type: 'poi',
        full_address: '567 Kings Boul., SomePlace, Ontario, M4G 2E5, Canada'
      }
    };

    const result = await queryForSingleResult(testServer, CREATE_ONLY_LOCATION_QUERY, { data: locationIn }, testContext);

    expect(result.errors).toBeUndefined();
    expect(result.data).not.toBeNull();
    expect(result.data?.createLocation).toMatchSnapshot();
  })
});

const LOCATION_NO_ROOMS_QUERY =
`query Locations($locationId: Int) {
  locations(locationId: $locationId) {
    type
    id
    geometry
    properties {
      name
      full_address
      feature_type
    }
  }
}`

const SINGLE_LOCATION_WITH_ROOMS_QUERY =
`query Locations($locationId: Int) {
  locations(locationId: $locationId) {
    id
    properties {
      name
    }
    rooms {
      roomId
      locationId
      name
      created_id
      created_at
    }
  }
}`

const CREATE_ONLY_LOCATION_QUERY =
`mutation CreateLocation($data: LocationInputType!) {
  createLocation(data: $data) {
    type
    id
    geometry
    properties {
      feature_type
      full_address
      name
    }
  }
}`