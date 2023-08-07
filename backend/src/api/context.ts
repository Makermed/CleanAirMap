import { LocationDAO } from "../dataAccess/adaptors/prismaAdaptor/LocationDAO";
import { ILocation} from "../dataAccess/interfaces";

type cleanAirDB = {
    locationDAO: ILocation
}
export interface Context {
    db: cleanAirDB
}

const locationDAO = new LocationDAO();

export const createContext =async () => ({
    db: {
        locationDAO: locationDAO
    }
})