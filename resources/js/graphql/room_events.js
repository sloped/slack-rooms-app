import gql from 'graphql-tag';

export default gql`query RoomsWithEvents
                {
                    rooms {
                        name
                        building
                        events {
                            name
                            creator
                            startTime
                            endTime
                            attendees
                        }
                    }
                }`;
