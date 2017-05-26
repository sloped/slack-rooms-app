import gql from 'graphql-tag';

export default gql`query RoomsWithEvents
                {
                    rooms {
                        name
                        events {
                            name
                            creator
                            startTime
                            endTime
                            attendees
                        }
                    }
                }`;
