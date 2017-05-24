import gql from 'graphql-tag';

export default gql`query User
                {
                    user {
                        name
                        is_admin
                    }
                }`;
