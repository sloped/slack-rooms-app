import gql from 'graphql-tag';

export default gql`
                mutation UpdateRoom($id: Int!, $room: RoomInput!) {
                  UpdateRoom(id: $id, input: $room) {
                    id
                    name
                    calendar
                  }
                }`;
