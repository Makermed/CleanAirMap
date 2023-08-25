import { PrismaClient } from "@prisma/client";
import { IDataAdaptor, ILocation, IReading, IRoom } from "../../interfaces";
import { LocationDAO } from "./LocationDAO";
import { RoomDAO } from "./RoomDAO";
import { ReadingDAO } from "./ReadingDAO";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

export class PrismaDataAdaptor implements IDataAdaptor {
    client : PrismaClient
    locationDAO: ILocation
    roomDAO: IRoom
    readingDAO: IReading

    constructor() {
        this.client = prisma
        this.locationDAO = new LocationDAO(this.client)
        this.roomDAO = new RoomDAO(this.client)
        this.readingDAO = new ReadingDAO(this.client)
    }
}