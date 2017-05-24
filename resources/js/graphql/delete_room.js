import gql from 'graphql-tag';

export default gql`
                mutation DeleteRoom($id: Int) {
                  DeleteRoom(id: $id) {
                    id
                    name
                    calendar
                  }
                }`;
