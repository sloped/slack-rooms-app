import gql from 'graphql-tag';

export default gql`query Rooms
                {
                    rooms {
                        name
                    }
                }`;
