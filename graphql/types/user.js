import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    is_admin: {
      type: GraphQLBoolean
    }
  }
});
