import gql from 'graphql-tag';
export default gql`query RoomEvents($roomName: String!) {
                events(name: $roomName) {
                    name
                    creator
                    startTime
                    endTime
                }
                }`