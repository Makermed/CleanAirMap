import { fakerEN_CA as faker, Faker } from '@faker-js/faker'
import { LocationModel } from "../dataTypes";

if(require.main === module) {
  if (process.argv.length === 3) {
    generateMultipleLocations(+process.argv[2]);
  }
  else {
    console.log("This script requires exactly one argument, the number of locations to generate.")
    console.log("eg. `npm run generate-location -- 3` to create 3 example locations")
  }
}

function generateMultipleLocations(location_count : number) : LocationModel[] {
  let locations = new Array<LocationModel>();

  for (let i : number = 0; i < location_count; i++) {
    locations.push(createTestLocation(i))
  }
  console.log(JSON.stringify(locations))
  return locations;
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