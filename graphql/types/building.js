import {
  GraphQLEnumType,
} from 'graphql';

export default new GraphQLEnumType({
  name: 'Building',
  description: 'The building a room is in.',
  values: {
    rayvic: {value: 'Rayvic'},
    annex: {value: 'Annex'},
  }
});
