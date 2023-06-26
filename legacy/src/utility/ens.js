import { GraphQLClient } from "graphql-request";

const QUERY_ENS_NAMES = `
query getNamesFromSubgraph($address: String!) 
{
    domains(
        first: 1000, 
        where: {resolvedAddress: $address}
    ) {
        name
        __typename
    }
}`;

const ENS_QUERY_ENDPOINT = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";

export const get_ens_name = async (address) => {
    const client = new GraphQLClient(ENS_QUERY_ENDPOINT, { headers: {} });
    try {
        const variables = {
            address: address //"0x33e3c007d1d48e2b645c9ce22570267b0c82f578"
        };
        const response = await client.request(QUERY_ENS_NAMES, variables);
        const domains = response["domains"];
        if (domains.length === 0) {
            return null;
        }
        return domains[domains.length-1]["name"];
    } catch (err) {
        console.log("Failed to get ens name :", address);
        return null;
    }
}

export const get_crypto_tokens = async (address) => {
    const query_api_endpoint = `https://api.ethplorer.io/getAddressInfo/${address}?apikey=freekey`;

    try {
        const response = await window.fetch(query_api_endpoint, {method: "GET"});
        if (response.status === 200) {
            const result = response.json();
            const tokens = result.tokens();
            if (tokens.length > 0) {
                return tokens;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (err) {
        console.log("Failed to get crypto tokens :", address);
        return null;
    };
}
