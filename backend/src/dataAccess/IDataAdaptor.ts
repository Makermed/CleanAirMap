import { PrismaDataAdaptor } from "./adaptors/prismaAdaptor/adaptor";
import { ILocation, IReading, IRoom } from "./interfaces";

export interface IDataAdaptor {
    locationDAO : ILocation
    roomDAO : IRoom
    readingDAO : IReading
}