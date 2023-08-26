import { LocationModel, RoomModel, ReadingModel } from "./src/dataAccess/dataTypes" 

import type { Context } from "./src/api/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigint<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "BigInt";
    /**
     * A GeoJSON Position
     */
    position<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Position";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigint<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "BigInt";
    /**
     * A GeoJSON Position
     */
    position<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Position";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AddReadingInputType: { // input type
    locationId: number; // Int!
    reading: NexusGenInputs['ReadingInputType']; // ReadingInputType!
  }
  AddReadingNewLocationInputType: { // input type
    location: NexusGenInputs['LocationInputType']; // LocationInputType!
    reading: NexusGenInputs['ReadingInputType']; // ReadingInputType!
  }
  LocationInputType: { // input type
    country: string; // String!
    description?: string | null; // String
    district?: string | null; // String
    locality?: string | null; // String
    name: string; // String!
    place: string; // String!
    position: NexusGenScalars['Position']; // Position!
    postcode?: string | null; // String
    region: string; // String!
    street: string; // String!
    type: NexusGenEnums['LocationEnum']; // LocationEnum!
  }
  ReadingInputType: { // input type
    notes?: string | null; // String
    unit: NexusGenEnums['ReadingUnitEnum']; // ReadingUnitEnum!
    value: number; // Float!
  }
}

export interface NexusGenEnums {
  LocationEnum: 999 | 15 | 8 | 2 | 18 | 3 | 14 | 22 | 23 | 19 | 10 | 4 | 9 | 7 | 12 | 1 | 13 | 11 | 16 | 21 | 6 | 17 | 20 | 0 | 5 | 24
  ReadingUnitEnum: "ppm CO2"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  BigInt: bigint
  DateTime: Date
  Position: any
}

export interface NexusGenObjects {
  AddReadingNewLocationPayload: { // root type
    location: NexusGenRootTypes['Location']; // Location!
    reading: NexusGenRootTypes['Reading']; // Reading!
  }
  AddReadingPayload: { // root type
    reading?: NexusGenRootTypes['Reading'] | null; // Reading
  }
  Location: LocationModel;
  LocationSummary: LocationModel;
  Mutation: {};
  Query: {};
  Reading: ReadingModel;
  Room: RoomModel;
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AddReadingNewLocationPayload: { // field return type
    location: NexusGenRootTypes['Location']; // Location!
    reading: NexusGenRootTypes['Reading']; // Reading!
  }
  AddReadingPayload: { // field return type
    reading: NexusGenRootTypes['Reading'] | null; // Reading
  }
  Location: { // field return type
    avgCo2: number | null; // Float
    created_at: NexusGenScalars['DateTime'] | null; // DateTime
    created_id: number | null; // Int
    description: string | null; // String
    district: string | null; // String
    locality: string | null; // String
    locationId: number | null; // Int
    name: string | null; // String
    place: string | null; // String
    position: NexusGenScalars['Position'] | null; // Position
    postcode: string | null; // String
    readings: NexusGenRootTypes['Reading'][] | null; // [Reading!]
    region: string | null; // String
    rooms: NexusGenRootTypes['Room'][] | null; // [Room!]
    street: string | null; // String
    type: NexusGenEnums['LocationEnum'] | null; // LocationEnum
  }
  LocationSummary: { // field return type
    avgCo2: number | null; // Float
    created_at: NexusGenScalars['DateTime'] | null; // DateTime
    created_id: number | null; // Int
    description: string | null; // String
    district: string | null; // String
    locality: string | null; // String
    locationId: number | null; // Int
    name: string | null; // String
    place: string | null; // String
    position: NexusGenScalars['Position'] | null; // Position
    postcode: string | null; // String
    region: string | null; // String
    street: string | null; // String
    type: NexusGenEnums['LocationEnum'] | null; // LocationEnum
  }
  Mutation: { // field return type
    addReading: NexusGenRootTypes['AddReadingPayload'] | null; // AddReadingPayload
    addReadingNewLocation: NexusGenRootTypes['AddReadingNewLocationPayload'] | null; // AddReadingNewLocationPayload
    createLocation: NexusGenRootTypes['Location'] | null; // Location
    createRoom: NexusGenRootTypes['Room'] | null; // Room
  }
  Query: { // field return type
    locationDetail: Array<NexusGenRootTypes['Location'] | null> | null; // [Location]
    locationSummary: Array<NexusGenRootTypes['LocationSummary'] | null> | null; // [LocationSummary]
    readings: Array<NexusGenRootTypes['Reading'] | null> | null; // [Reading]
    rooms: Array<NexusGenRootTypes['Room'] | null> | null; // [Room]
  }
  Reading: { // field return type
    created_at: NexusGenScalars['DateTime']; // DateTime!
    id: NexusGenScalars['BigInt']; // BigInt!
    location: NexusGenRootTypes['Location']; // Location!
    notes: string | null; // String
    unit: NexusGenEnums['ReadingUnitEnum']; // ReadingUnitEnum!
    value: number; // Float!
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
  AddReadingNewLocationPayload: { // field return type name
    location: 'Location'
    reading: 'Reading'
  }
  AddReadingPayload: { // field return type name
    reading: 'Reading'
  }
  Location: { // field return type name
    avgCo2: 'Float'
    created_at: 'DateTime'
    created_id: 'Int'
    description: 'String'
    district: 'String'
    locality: 'String'
    locationId: 'Int'
    name: 'String'
    place: 'String'
    position: 'Position'
    postcode: 'String'
    readings: 'Reading'
    region: 'String'
    rooms: 'Room'
    street: 'String'
    type: 'LocationEnum'
  }
  LocationSummary: { // field return type name
    avgCo2: 'Float'
    created_at: 'DateTime'
    created_id: 'Int'
    description: 'String'
    district: 'String'
    locality: 'String'
    locationId: 'Int'
    name: 'String'
    place: 'String'
    position: 'Position'
    postcode: 'String'
    region: 'String'
    street: 'String'
    type: 'LocationEnum'
  }
  Mutation: { // field return type name
    addReading: 'AddReadingPayload'
    addReadingNewLocation: 'AddReadingNewLocationPayload'
    createLocation: 'Location'
    createRoom: 'Room'
  }
  Query: { // field return type name
    locationDetail: 'Location'
    locationSummary: 'LocationSummary'
    readings: 'Reading'
    rooms: 'Room'
  }
  Reading: { // field return type name
    created_at: 'DateTime'
    id: 'BigInt'
    location: 'Location'
    notes: 'String'
    unit: 'ReadingUnitEnum'
    value: 'Float'
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
    addReading: { // args
      input: NexusGenInputs['AddReadingInputType']; // AddReadingInputType!
    }
    addReadingNewLocation: { // args
      input: NexusGenInputs['AddReadingNewLocationInputType']; // AddReadingNewLocationInputType!
    }
    createLocation: { // args
      data: NexusGenInputs['LocationInputType']; // LocationInputType!
    }
    createRoom: { // args
      locationId: number; // Int!
      name: string; // String!
    }
  }
  Query: {
    locationDetail: { // args
      locationId?: number | null; // Int
    }
    locationSummary: { // args
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

export type NexusGenInputNames = keyof NexusGenInputs;

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