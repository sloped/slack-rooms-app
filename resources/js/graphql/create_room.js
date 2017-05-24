import gql from 'graphql-tag';

export default gql`
                mutation CreateRoom($room: RoomInput) {
                  CreateRoom(input: $room) {
                    id
                    name
                    calendar
                  }
                }`;
