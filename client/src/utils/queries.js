import gql from 'graphql-tag';

export const GET_ME = gql`
    {
        me {
            _id
            email
            username
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;