import { IDataAdaptor } from "../dataAccess/interfaces";
import { PrismaDataAdaptor } from "../dataAccess/adaptors/prismaAdaptor/adaptor";

export interface Context {
    db: IDataAdaptor
}

export const createContext =async () => ({
    db: new PrismaDataAdaptor()
})