import { ApolloServer, GraphQLResponse } from "@apollo/server";
import { schema } from "./schema";
import { Context } from "./context"
import { TestAdaptor } from "../dataAccess/adaptors/testAdaptor/adaptor";
import { LocationModel, RoomModel } from "../dataAccess/dataTypes";
import { assert } from "console";

const testServer = new ApolloServer<Context>({schema})

const testContext = {
    db: new TestAdaptor()
}

function mockSingleLocation() : Promise<LocationModel | null> {
    const location : LocationModel = {
        locationId: 1,
        name: 'Location 1',
        type: 3,
        street: '1 Main St',
        locality: null,
        place: 'AnyTown',
        district: null,
        region: 'StateProv',
        postcode: 'H0H0H0',
        country: 'Any Nation',
        latitude: 30,
        longitude: 40.32908,
        description: 'A fun place to be',
        avgCo2: 900,
        created_id: 1,
        created_at: new Date("2023-01-01")

    }
    return Promise.resolve(location)
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

it('fetches a single location, no rooms', async() => {
    testContext.db.locationDAO.getById = jest.fn().mockReturnValueOnce(mockSingleLocation())

    const response = testServer.executeOperation(
        {
            query: SINGLE_LOCATION_NO_ROOMS_QUERY,
            variables: { locationId: 1}
        },
        {
            contextValue: testContext
        }
    )

    const result = await response

    assert(result.body.kind === 'single')
    expect(result.body).toMatchSnapshot()
  }
)

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
}
)

const SINGLE_LOCATION_NO_ROOMS_QUERY =
`query Locations($locationId: Int) {
  locations(locationId: $locationId) {
    locationId
    name
    avgCo2
    created_at
    created_id
    description
    district
    locality
    place
    position
    postcode
    region
    street
    type
  }
}`

const SINGLE_LOCATION_WITH_ROOMS_QUERY =
`query Locations($locationId: Int) {
  locations(locationId: $locationId) {
    locationId
    name
    rooms {
      roomId
      locationId
      name
      created_id
      created_at
    }
  }
}`