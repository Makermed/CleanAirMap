import { IDataAdaptor } from "../../IDataAdaptor";
import { ILocation } from "../../ILocation";
import { IRoom } from "../../IRoom";
import { LocationModel, RoomModel } from "../../dataTypes";

class TestLocationDAO implements ILocation {
    getById(id: number): Promise<LocationModel | null> {
        return Promise.reject(new Error("Not implemented"));
    }

    getMany(maxResults?: number | undefined): Promise<LocationModel[]> {
        return Promise.reject(new Error("Not implemented"));
    }

    getRooms(locationId: number): Promise<RoomModel[] | null> {
        return Promise.reject(new Error("Not implemented"));
    }

    create(reading: LocationModel): Promise<LocationModel | null> {
        return Promise.reject(new Error("Not implemented"));
    }
}

class TestRoomDAO implements IRoom {
    create(reading: RoomModel): Promise<RoomModel | null> {
        return Promise.reject(new Error("Not implemented"));
    }
    getById(id: number): Promise<RoomModel | null> {
        return Promise.reject(new Error("Not implemented"));
    }
    getByLocation(location: LocationModel): Promise<RoomModel[] | null> {
        return Promise.reject(new Error("Not implemented"));
    }
    getMany(maxResults?: number | undefined): Promise<RoomModel[]> {
        return Promise.reject(new Error("Not implemented"));
    }
}

export class TestAdaptor implements IDataAdaptor {
    locationDAO: ILocation;
    roomDAO: IRoom;

    constructor() {
        this.locationDAO = new TestLocationDAO();
        this.roomDAO = new TestRoomDAO();
    }
}