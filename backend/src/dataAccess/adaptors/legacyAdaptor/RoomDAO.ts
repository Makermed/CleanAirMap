
import { IRoom } from '../../interfaces'
import { RoomModel, LocationModel } from '../../dataTypes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

class RoomDAO implements IRoom {
    client : ApolloClient<NormalizedCacheObject>;

    constructor(client : ApolloClient<NormalizedCacheObject>) {
        this.client = client;
    }

    getById(id: number) : Promise<RoomModel | null> {
        return Promise.reject(new Error("Not implemented"));
    };

    getMany(maxResults? : number) : Promise<RoomModel[]>
    {
        return Promise.reject(new Error("Not implemented"));
    };

    create(room: RoomModel) : Promise<RoomModel | null>
    {
        return Promise.reject(new Error("Not implemented"));
    };

    getByLocation(location: LocationModel): Promise<RoomModel[] | null> {
        return Promise.reject(new Error("Not implemented"));
    };
}

export default RoomDAO;