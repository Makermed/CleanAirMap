import { Location, PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

const userCount = 10;
const locationCount = 50;
const roomRange = { min: 0, max: 10 }
const readingRange = { min: 0, max: 10 }

async function main() {
    const userList = await createUsers() ?? [];
    console.log(`Found or created ${userList.length} users, target was ${userCount}`);

    createLocations(userList)
    const locations = await prisma.location.findMany()
    locations.forEach(async location => {
        createRooms(location, userList).then((roomReadingCount) => { createLocationReadings(location, roomReadingCount, userList) }).catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    });
}

main().then(
    async () => { await prisma.$disconnect() }
)
    .catch(
        async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        }
    )

async function createUsers() {
    for (let created = 0; created < userCount; created++) {
        let user = await prisma.user.upsert({
            where: { id: created },
            update: {},
            create: { id: created }
        });
    }
    return prisma.user.findMany()
}

async function createRooms(location: Location, userList: User[]): Promise<number> {
    const roomCount = getRandomInt(roomRange.min, roomRange.max);
    let readingCount = 0;
    let readingMax = readingRange.max;
    for (let roomNum = 0; roomNum < roomCount; roomNum++) {
        const newRoomInfo = createRoom(location, pickUser(userList), readingMax)
        readingCount += newRoomInfo.readingCount;
        await prisma.room.create({ data: newRoomInfo.room })
        readingMax = readingMax - newRoomInfo.readingCount;
    }
    return readingCount
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function getRandomChar() {
    const possibleValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789'
    return possibleValues.charAt(getRandomInt(0, possibleValues.length))
}

function getRandomString(minLength: number, maxLength: number) {
    let length = getRandomInt(minLength, maxLength)
    return [...Array(length)].map(() => getRandomChar()).join('')
}

function createLocation(userList: User[]) {
    let locData = {
        name: getRandomString(5, 20),
        street: getRandomString(5, 20),
        locality: getRandomString(5, 20),
        place: getRandomString(5, 20),
        district: getRandomString(5, 20),
        region: getRandomString(5, 20),
        postcode: getRandomString(5, 20),
        country: getRandomString(5, 20),
        type: getRandomInt(1, 24),
        latitude: getRandomFloat(-90, 90),
        longitude: getRandomFloat(-180, 180),
        description: getRandomString(20, 200),
        avgCo2: null,
        created_id: pickUser(userList)
    };
    return locData;
}

function createRoom(location: Location, userId: number, readingMax: number) {
    let newReadingInfo = createReadings(location.locationId, userId, readingMax)
    let room: any = {
        locationId: location.locationId,
        name: getRandomString(5, 20),
        created_id: userId
    }
    if (newReadingInfo.readings.length > 0) {
        room.readings = { create: newReadingInfo.readings }
    }
    return { room: room, readingCount: newReadingInfo.readingCount };
}

function createReading(locationId: number, userId: number) {
    return {
        locationId: locationId,
        value: getRandomInt(0, 20000),
        unit: "ppm CO\u2082",
        created_id: userId
    };
}

function createReadings(locationId: number, userId: number, readingMax: number) {
    const readingCount = getRandomInt(0, readingMax);
    let readingArray = []
    for (let readingNum = 0; readingNum < readingCount; readingNum++) {
        readingArray.push(createReading(locationId, userId))
    }
    return { readings: readingArray, readingCount: readingCount }
}

async function createLocationReadings(location: Location, roomReadingCount: number, userList: User[]) {
    const readingsAvailable = getRandomInt(0, readingRange.max - roomReadingCount)
    prisma.reading.createMany({ data: createReadings(location.locationId, pickUser(userList), readingsAvailable).readings })
    .then(result => { console.log(`Created ${result.count} location readings` )})
    .catch( async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
}

async function createLocations(userList: User[]) {
    const locationsBefore = await prisma.location.findMany() ?? []

    let have = locationsBefore.length
    let needTotal = locationCount

    if (have < needTotal) {
        let needMore = needTotal - have;
        console.log(`Found ${have} locations of ${needTotal}, ${needMore} to create `)

        if (userList.length === 0) { throw Error('Need at least one user to create a location') }

        let userData = [...Array(needMore)].map(() => createLocation(userList));
        prisma.location.createMany({ data: userData }).then((result) => console.log(`Created ${result.count} locations`))
    }
    else {
        console.log(`Found ${have} locations of ${needTotal}, nothing to do`)
    }
}

function pickUser(userList: User[]): number {
    return userList[getRandomInt(0, userList.length)].id
}
