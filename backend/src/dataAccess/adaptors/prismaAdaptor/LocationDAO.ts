import { PrismaClient, Location } from "@prisma/client";
import { ILocation } from '../../interfaces'

export class LocationDAO implements ILocation {
    client = new PrismaClient();

    getById(id: number) : Promise<Location | null> {
        return this.client.location.findUnique({ where: { id: id}});
    };

    getMany(maxResults? : number) : Promise<Location[]>
    {
        return this.client.location.findMany();
    };

    create(location: Location) : Promise<Location | null>
    {
        return this.client.location.create ( { data: location } );
    };
}