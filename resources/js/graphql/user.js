import gql from 'graphql-tag';

export default gql`
                {
                    user {
                        name
                        is_admin
                    }
                }`;
