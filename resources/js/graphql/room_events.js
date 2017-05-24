import gql from 'graphql-tag';

export default gql`query RoomWithEvents
                {
                    rooms {
                        name
                        events {
                            startTime
                            endTime
                        }
                    }
                }`;
