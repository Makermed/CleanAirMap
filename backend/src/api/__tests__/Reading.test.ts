import { ApolloServer } from "@apollo/server";
import { schema } from "../schema";
import { Context } from "../context"
import { TestAdaptor } from "../../dataAccess/adaptors/testAdaptor/adaptor";
import { NexusGenInputs } from "../../../nexus-typegen";
import * as testSetup from './__test_setup'
import { queryForSingleResult } from './__query_helper';

const testServer = new ApolloServer<Context>({schema})

const testContext = {
    db: new TestAdaptor()
}

describe('add reading and location mutation', () => {
  testSetup.mockLocationDAO(testContext.db);
  testSetup.mockReadingDAO(testContext.db);
  it('stores a new location with a new reading' , async () => {
    const inputData : NexusGenInputs["AddReadingNewLocationInputType"] = {
      location : {
        type: 'Feature',
        geometry: { coordinates: [-86.9259644,43.4708553] },
        properties: {
          name: 'Create location test',
          feature_type: 'poi',
          full_address: '567 Kings Boul., SomePlace, Ontario, M4G 2E5, Canada'
        }
      },
      reading : {
        value: 567,
        //@ts-ignore Type conflict on unit Enum, not sure why
        unit: "PPM_CO2",
        notes: "Reading notes"
      }
    };

    const result = await queryForSingleResult(testServer, CREATE_LOCATION_WITH_READING_QUERY, { data: inputData }, testContext);

    expect(result.errors).toBeUndefined();
    expect(result.data).not.toBeNull();
    expect(result.data?.addReadingNewLocation).toMatchSnapshot();
  })
})

const READINGS_QUERY =
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

const CREATE_LOCATION_WITH_READING_QUERY =
`mutation CreateLocationWithReading($data: AddReadingNewLocationInputType!) {
  addReadingNewLocation(input: $data) {
    location {
      type
      id
      geometry
      properties {
        feature_type
        full_address
        name
      }
    }
    reading {
      id
      location {
        id
      }
      value
      unit
      notes
      created_at
    }
  }
}`