import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo';
import Vue from 'vue';
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    transportBatching: true,
  }),
  connectToDevTools: true,
});
// Install the vue plugin
Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;