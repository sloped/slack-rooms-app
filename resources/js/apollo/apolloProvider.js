import { ApolloClient, createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';
import Vue from 'vue';
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    transportBatching: true,
    opts: {
      credentials: 'same-origin',
    },
  }),
  connectToDevTools: true,
});
// Install the vue plugin
Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;
