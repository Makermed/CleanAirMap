import { ApolloServer, GraphQLResponse } from "@apollo/server";
import { schema } from "./schema";
import { Context } from "./context"
import { TestAdaptor } from "../dataAccess/adaptors/testAdaptor/adaptor";
import { LocationModel, RoomModel } from "../dataAccess/dataTypes";
import { assert } from "console";
import { faker, Faker } from '@faker-js/faker'

const testServer = new ApolloServer<Context>({schema})

const testContext = {
    db: new TestAdaptor()
}

function mockSingleLocation() : Promise<LocationModel | null> {
    const location : LocationModel = {
        locationId: 1,
        name: 'Location 1',
        feature_type: 'poi',
        full_address: '123 Main St, AnyTown, StateProv, H0H0H0, Any Nation',
        geometry: { coordinates: [30,40.32908] },
        created_id: 1,
        created_at: new Date("2023-01-01")

    }
    return Promise.resolve(location)
}

function createTestLocation(seed : number) : LocationModel {
  faker.seed(seed);
  faker.setDefaultRefDate('2023-01-01T00:00:00.000Z')
  const location : LocationModel = {
    locationId: seed,
    name: faker.company.name(),
    feature_type: 'poi',
    full_address: createFakeAddress(faker),
    geometry: { coordinates: [faker.location.longitude(), faker.location.latitude()] },
    created_id: 1,
    created_at: faker.date.anytime()
  };

  return location;
}

function createFakeAddress(my_faker : Faker) : string {
  const l = my_faker.location;
  return [l.streetAddress(), l.city(), l.state(), l.countryCode()].join(', ');
}

function mockMultipleLocations() : Promise<LocationModel[] | null> {
  let locations = new Array<LocationModel>();

  for (let i : number = 0; i <= 5; i++) {
    locations.push(createTestLocation(i))
  }

  return Promise.resolve(locations)
}

function mockSingleLocationRooms() : Promise<RoomModel[] | null> {
  const rooms : RoomModel[] = [{
    roomId : 1,
    locationId: 1,
    name: 'L1 Room 1',
    created_id: 1,
    created_at: new Date("2023-01-01")
  },{
    roomId : 2,
    locationId: 1,
    name: 'L1 Room 2',
    created_id: 1,
    created_at: new Date("2023-01-01")
  },{
    roomId : 3,
    locationId: 1,
    name: 'L1 Room 3',
    created_id: 1,
    created_at: new Date("2023-01-01")
  },]
  return Promise.resolve(rooms)
}

describe("locations query field", () => {
  it('fetches a single location, no rooms', async() => {
    testContext.db.locationDAO.getById = jest.fn().mockReturnValueOnce(mockSingleLocation())

    const response = testServer.executeOperation(
        {
            query: LOCATION_NO_ROOMS_QUERY,
            variables: { locationId: 1}
        },
        {
            contextValue: testContext
        }
    )

    const result = await response

    assert(result.body.kind === 'single')
    expect(result.body).toMatchSnapshot()
  })

  it('fetches a single location\'s rooms', async() => {
    testContext.db.locationDAO.getById = jest.fn().mockReturnValueOnce(mockSingleLocation())
    testContext.db.locationDAO.getRooms = jest.fn().mockReturnValueOnce(mockSingleLocationRooms())

    const response = testServer.executeOperation(
        {
            query: SINGLE_LOCATION_WITH_ROOMS_QUERY,
            variables: { locationId: 1}
        },
        {
            contextValue: testContext
        }
    )

    const result = await response

    assert(result.body.kind === 'single')
    expect(result.body).toMatchSnapshot()
  })

  it('fetches multiple locations', async() => {
    testContext.db.locationDAO.getMany = jest.fn().mockReturnValueOnce(mockMultipleLocations())

    const response = testServer.executeOperation(
        {
            query: LOCATION_NO_ROOMS_QUERY,
            variables: { locationId: null }
        },
        {
            contextValue: testContext
        }
    )

    const result = await response

    expect(result.body).toMatchSnapshot()
    assert(result.body.kind === 'single')
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