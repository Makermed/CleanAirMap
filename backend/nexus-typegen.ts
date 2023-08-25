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
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    jsonObject<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSONObject";
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
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    jsonObject<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSONObject";
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
    geometry: NexusGenScalars['JSONObject']; // JSONObject!
    properties: NexusGenInputs['POIPropertiesInputType']; // POIPropertiesInputType!
    type: string; // String!
  }
  POIPropertiesInputType: { // input type
    feature_type?: string | null; // String
    full_address: string; // String!
    name: string; // String!
  }
  ReadingInputType: { // input type
    notes?: string | null; // String
    unit: NexusGenEnums['ReadingUnitEnum']; // ReadingUnitEnum!
    value: number; // Float!
  }
}

export interface NexusGenEnums {
  ReadingUnitEnum: "ppm CO2"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: Date
  JSONObject: any
  Position: any
}

export interface NexusGenObjects {
  AddReadingNewLocationPayload: { // root type
    location: NexusGenRootTypes['Location']; // Location!
    reading: NexusGenRootTypes['Reading']; // Reading!
  }
  Location: LocationModel;
  Mutation: {};
  POIProperties: { // root type
    feature_type?: string | null; // String
    full_address: string; // String!
    name: string; // String!
  }
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
  Location: { // field return type
    geometry: NexusGenScalars['JSONObject'] | null; // JSONObject
    id: number; // Int!
    properties: NexusGenRootTypes['POIProperties']; // POIProperties!
    rooms: NexusGenRootTypes['Room'][] | null; // [Room!]
    type: string; // String!
  }
  Mutation: { // field return type
    addReadingNewLocation: NexusGenRootTypes['AddReadingNewLocationPayload'] | null; // AddReadingNewLocationPayload
    createLocation: NexusGenRootTypes['Location'] | null; // Location
    createRoom: NexusGenRootTypes['Room'] | null; // Room
  }
  POIProperties: { // field return type
    feature_type: string | null; // String
    full_address: string; // String!
    name: string; // String!
  }
  Query: { // field return type
    locations: Array<NexusGenRootTypes['Location'] | null> | null; // [Location]
    readings: Array<NexusGenRootTypes['Reading'] | null> | null; // [Reading]
    rooms: Array<NexusGenRootTypes['Room'] | null> | null; // [Room]
  }
  Reading: { // field return type
    created_at: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
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
  Location: { // field return type name
    geometry: 'JSONObject'
    id: 'Int'
    properties: 'POIProperties'
    rooms: 'Room'
    type: 'String'
  }
  Mutation: { // field return type name
    addReadingNewLocation: 'AddReadingNewLocationPayload'
    createLocation: 'Location'
    createRoom: 'Room'
  }
  POIProperties: { // field return type name
    feature_type: 'String'
    full_address: 'String'
    name: 'String'
  }
  Query: { // field return type name
    locations: 'Location'
    readings: 'Reading'
    rooms: 'Room'
  }
  Reading: { // field return type name
    created_at: 'DateTime'
    id: 'Int'
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