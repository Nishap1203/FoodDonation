import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  // uri: "http://localhost:5000/graphql",
  uri: "http://https://fooddonation-system.onrender.com/graphql",
  credentials: "include",
});
const authLink = setContext((_, { headers }) => {
  // console.log("inside apollo client");
  const token = localStorage.getItem("token");
  // console.log(token);
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default client;