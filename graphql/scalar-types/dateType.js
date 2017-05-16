import moment from 'moment';
import {
  GraphQLScalarType
} from 'graphql';

var DateType = new GraphQLScalarType({
  name: 'Date',
  serialize: dateValue,
  parseValue: dateValue,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return dateValue(ast.value);
    }
    return null;
  }
});

function dateValue(value) {
    
    var date =  moment(value, 'YYYY-MM-DDTHH:mm:ssZZ').valueOf();
    return date;
}

module.exports = DateType;