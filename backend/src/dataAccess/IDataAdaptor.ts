import { PrismaDataAdaptor } from "./adaptors/prismaAdaptor/adaptor";
import { ILocation, IRoom } from "./interfaces";

export interface IDataAdaptor {
    locationDAO : ILocation
    roomDAO : IRoom
}