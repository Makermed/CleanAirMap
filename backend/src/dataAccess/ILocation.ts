import { LocationModel } from "./dataTypes";
export interface ILocation {
    getById(id: number) : Promise<LocationModel | null>;
    getMany(maxResults? : number) : Promise<LocationModel[]>;

    create(reading: LocationModel) : Promise<LocationModel | null>;
}