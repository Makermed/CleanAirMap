import { ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

 const httpLink = createHttpLink({
   uri: process.env.EXPO_PUBLIC_GRAPHQL_ADDRESS,
 });
 

 const authLink = setContext(async (_, { headers }) => {
   // localStorage persists the token even if the user closes the browser.
   let firebaseToken = null;
   try {
      firebaseToken = await AsyncStorage.getItem('firebase-token');
   } catch (e) {
      console.log(e);
      return {headers: {...headers}}
   }
   const token = firebaseToken ? JSON.parse(firebaseToken).jwt : null;
   const hasuraClaim =  firebaseToken ? JSON.parse(firebaseToken).hasura_claim : null;
   if (!token || !hasuraClaim) {
      return {headers: {...headers}}
   }

   return {
      // Append the token to the request headers.
     headers: {
       ...headers,
       authorization: token ? `Bearer ${token}` : "",
       'x-hasura-user-id': hasuraClaim["x-hasura-user-id"],
       'x-hasura-allowed-roles': hasuraClaim["x-hasura-allowed-roles"],
       'x-hasura-default-role': hasuraClaim["x-hasura-default-role"],
     }
   }
 });

const clientFn = () => {
  console.log("Creating a new client");
  const c = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache()
 });
 return c;
};

const client = clientFn();
const logoutCurrentUser = () : void => {
   client.resetStore();
}

export {client, logoutCurrentUser}