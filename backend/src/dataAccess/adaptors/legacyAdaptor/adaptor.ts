import { IDataAdaptor, ILocation, IReading, IRoom } from "../../interfaces";
import LocationDAO from "./LocationDAO";
import RoomDAO from "./RoomDAO";
import ReadingDAO from "./ReadingDAO";
import { HttpLink, ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import fetch from 'node-fetch'

/**
 * This adaptor queries from the legacy GraphQL endpoint and is just for
 * development/migration.
 */
export class LegacyAdaptor implements IDataAdaptor {
    client: ApolloClient<NormalizedCacheObject>;
    locationDAO: ILocation;
    roomDAO: IRoom;
    readingDAO: IReading;

    constructor(private endpoint: string) {
        this.client = new ApolloClient({
            link: new HttpLink({
                uri: endpoint,
                fetch: fetch
              }),
            cache: new InMemoryCache()
          });
      this.locationDAO = new LocationDAO(this.client);
      this.roomDAO = new RoomDAO(this.client);
      this.readingDAO = new ReadingDAO(this.client)
    }
  }
