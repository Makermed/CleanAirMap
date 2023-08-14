import { LocationDAO } from "../dataAccess/adaptors/prismaAdaptor/LocationDAO";
import { ILocation, IRoom} from "../dataAccess/interfaces";
import { RoomDAO } from "../dataAccess/adaptors/prismaAdaptor/RoomDAO";

type cleanAirDB = {
    locationDAO: ILocation
    roomDAO: IRoom
}
export interface Context {
    db: cleanAirDB
}

const locationDAO = new LocationDAO();
const roomDAO = new RoomDAO();

export const createContext =async () => ({
    db: {
        locationDAO: locationDAO,
        roomDAO: roomDAO
    }
})