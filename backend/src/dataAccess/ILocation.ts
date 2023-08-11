import { Location } from "@prisma/client"
export interface ILocation {
    getById(id: number) : Promise<Location | null>;
    getMany(maxResults? : number) : Promise<Location[]>;

    create(reading: Location) : Promise<Location | null>;
}