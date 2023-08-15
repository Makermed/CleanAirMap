import { PrismaClient } from "@prisma/client";
import { IRoom } from '../../interfaces'
import { RoomModel, LocationModel } from '../../dataTypes'

export class RoomDAO implements IRoom {
    client : PrismaClient;

    constructor(client : PrismaClient) {
        this.client = client;
    }
    
    getById(id: number) : Promise<RoomModel | null> {
        return this.client.room.findUnique({ where: { roomId: id}});
    };

    getMany(maxResults? : number) : Promise<RoomModel[]>
    {
        return this.client.room.findMany();
    };

    create(room: RoomModel) : Promise<RoomModel | null>
    {
        return this.client.room.create ( { data: room } );
    };

    getByLocation(location: LocationModel): Promise<RoomModel[] | null> {
        return this.client.location.findUnique( { where: { locationId: location.locationId } }).rooms();
    }
}