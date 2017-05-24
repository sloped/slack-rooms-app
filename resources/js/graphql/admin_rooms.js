import gql from 'graphql-tag';

export default gql`
                {
                    rooms {
                        name,
                        calendar
                    }
                }`;
