import { PrismaClient } from "@prisma/client";
import { ILocation } from '../../interfaces'
import { LocationModel, RoomModel } from '../../dataTypes'

export class LocationDAO implements ILocation {
    client = new PrismaClient();

    getById(id: number) : Promise<LocationModel | null> {
        return this.client.location.findUnique({ where: { locationId: id}});
    };

    getMany(maxResults? : number) : Promise<LocationModel[]>
    {
        return this.client.location.findMany();
    };

    create(location: LocationModel) : Promise<LocationModel | null>
    {
        return this.client.location.create ( { data: location } );
    };

    getRooms(locationId : number) : Promise<RoomModel[] | null>
    {
        return this.client.location.findUnique( { where: { locationId: locationId } }).rooms();
    }
}