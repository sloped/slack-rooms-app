import gql from 'graphql-tag';

export default gql`query RoomsForAdmin
                {
                    rooms {
                        id,
                        name,
                        calendar,
                        building
                    }
                }`;
