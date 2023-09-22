
import { IReading } from '../../interfaces'
import { ReadingModel, LocationModel } from '../../dataTypes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

class ReadingDAO implements IReading {
    client : ApolloClient<NormalizedCacheObject>;

    constructor(client : ApolloClient<NormalizedCacheObject>) {
        this.client = client;
    }

    getById(id: number) : Promise<ReadingModel | null> {
        return Promise.reject(new Error("Not implemented"));
    };

    getMany(maxResults? : number) : Promise<ReadingModel[]>
    {
        return Promise.reject(new Error("Not implemented"));
    };

    create(room: ReadingModel) : Promise<ReadingModel | null>
    {
        return Promise.reject(new Error("Not implemented"));
    };

    getByLocation(location: LocationModel): Promise<ReadingModel[] | null> {
        return Promise.reject(new Error("Not implemented"));
    };
}

export default ReadingDAO;