import { PrismaClient } from "@prisma/client";
import { IDataAdaptor, ILocation, IRoom } from "../../interfaces";
import { LocationDAO } from "./LocationDAO";
import { RoomDAO } from "./RoomDAO";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

export class PrismaDataAdaptor implements IDataAdaptor {
    client : PrismaClient
    locationDAO: ILocation
    roomDAO: IRoom

    constructor() {
        this.client = prisma
        this.locationDAO = new LocationDAO(this.client)
        this.roomDAO = new RoomDAO(this.client)
    }
}