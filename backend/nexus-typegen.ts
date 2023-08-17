import { LocationModel, RoomModel } from "./src/dataAccess/dataTypes" 

import type { Context } from "./src/api/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  LocationEnum: 999 | 15 | 8 | 2 | 18 | 3 | 14 | 22 | 23 | 19 | 10 | 4 | 9 | 7 | 12 | 1 | 13 | 11 | 16 | 21 | 6 | 17 | 20 | 0 | 5 | 24
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: Date
}

export interface NexusGenObjects {
  Location: LocationModel;
  Mutation: {};
  Query: {};
  Room: RoomModel;
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Location: { // field return type
    avgCo2: number | null; // Float
    created_at: NexusGenScalars['DateTime'] | null; // DateTime
    created_id: number | null; // Int
    description: string | null; // String
    district: string | null; // String
    latitude: number | null; // Float
    locality: string | null; // String
    locationId: number | null; // Int
    longitude: number | null; // Float
    name: string | null; // String
    place: string | null; // String
    postcode: string | null; // String
    region: string | null; // String
    rooms: NexusGenRootTypes['Room'][] | null; // [Room!]
    street: string | null; // String
    type: NexusGenEnums['LocationEnum'] | null; // LocationEnum
  }
  Mutation: { // field return type
    createLocation: NexusGenRootTypes['Location'] | null; // Location
    createRoom: NexusGenRootTypes['Room'] | null; // Room
  }
  Query: { // field return type
    locations: Array<NexusGenRootTypes['Location'] | null> | null; // [Location]
    rooms: Array<NexusGenRootTypes['Room'] | null> | null; // [Room]
  }
  Room: { // field return type
    created_at: NexusGenScalars['DateTime'] | null; // DateTime
    created_id: number | null; // Int
    locationId: number | null; // Int
    name: string | null; // String
    roomId: number | null; // Int
  }
}

export interface NexusGenFieldTypeNames {
  Location: { // field return type name
    avgCo2: 'Float'
    created_at: 'DateTime'
    created_id: 'Int'
    description: 'String'
    district: 'String'
    latitude: 'Float'
    locality: 'String'
    locationId: 'Int'
    longitude: 'Float'
    name: 'String'
    place: 'String'
    postcode: 'String'
    region: 'String'
    rooms: 'Room'
    street: 'String'
    type: 'LocationEnum'
  }
  Mutation: { // field return type name
    createLocation: 'Location'
    createRoom: 'Room'
  }
  Query: { // field return type name
    locations: 'Location'
    rooms: 'Room'
  }
  Room: { // field return type name
    created_at: 'DateTime'
    created_id: 'Int'
    locationId: 'Int'
    name: 'String'
    roomId: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createLocation: { // args
      country: string; // String!
      description?: string | null; // String
      district?: string | null; // String
      lat: number; // Float!
      locality?: string | null; // String
      long: number; // Float!
      name: string; // String!
      place: string; // String!
      postcode?: string | null; // String
      region: string; // String!
      street: string; // String!
      type: NexusGenEnums['LocationEnum']; // LocationEnum!
    }
    createRoom: { // args
      locationId: number; // Int!
      name: string; // String!
    }
  }
  Query: {
    locations: { // args
      locationId?: number | null; // Int
    }
    rooms: { // args
      roomId?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}