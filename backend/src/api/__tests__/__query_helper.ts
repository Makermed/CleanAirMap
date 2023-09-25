import { ApolloServer, GraphQLResponse } from "@apollo/server";
import assert from 'assert'
import { FormattedExecutionResult } from "graphql";
import { Context } from "../context";
import { ObjMap } from "graphql/jsutils/ObjMap";

export async function queryForSingleResult(server: ApolloServer<Context>, query : string, vars : Object, ctx: Context) : Promise<FormattedExecutionResult<Record<string, unknown>, ObjMap<unknown>>> {
    const { body } : GraphQLResponse<Record<string,unknown>> = await server.executeOperation(
        {
            query: query,
            variables: vars
        },
        {
            contextValue: ctx
        }
    );

    assert (body.kind === 'single')
    return Promise.resolve(body.singleResult);
};