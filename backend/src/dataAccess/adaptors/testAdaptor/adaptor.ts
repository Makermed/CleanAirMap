import { IDataAdaptor } from "../../IDataAdaptor";
import { ILocation } from "../../ILocation";
import { IReading } from "../../IReading";
import { IRoom } from "../../IRoom";
import { LocationModel, LocationModelInput, ReadingModel, RoomModel } from "../../dataTypes";

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

    getReadings(locationId: number): Promise<ReadingModel[] | null> {
        return Promise.reject(new Error("Not implemented"));
    }
    create(reading: LocationModelInput): Promise<LocationModel | null> {
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

class TestReadingDAO implements IReading {
    create(reading: ReadingModel): Promise<ReadingModel | null> {
        return Promise.reject(new Error("Not implemented"));
    }

    getById(id: number): Promise<ReadingModel | null> {
        return Promise.reject(new Error("Not implemented"));
    }

    getMany(maxResults?: number | undefined): Promise<ReadingModel[]> {
        return Promise.reject(new Error("Not implemented"));
    }
}

export class TestAdaptor implements IDataAdaptor {
    locationDAO: ILocation;
    roomDAO: IRoom;
    readingDAO: IReading;

    constructor() {
        this.locationDAO = new TestLocationDAO();
        this.roomDAO = new TestRoomDAO();
        this.readingDAO = new TestReadingDAO();
    }
}