import gql from 'graphql-tag';

export default gql`
                {
                    rooms {
                        name
                        events {
                            startTime
                            endTime
                        }
                    }
                }`;