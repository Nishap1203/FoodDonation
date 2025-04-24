// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { ApolloClient, InMemoryCache,HttpLink } from "@apollo/client";

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "http://localhost:5000/graphql",
//     credentials: "include",
//   }),
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
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