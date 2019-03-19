import React, { Component } from 'react';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      available
    }
  }
`;

import { Mutation } from "react-apollo";
const CHANGE_AVAILABILITY = gql`
  mutation editBook($id: String!, $available: Boolean!){
    editBook(id: $id, available: $available){
      id,
      available
    }
  }
`;

class BookList extends Component {
  render() {
    return (
      <Query query={GET_BOOKS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading</div>
          }

          if (error) {
            return <div>Error: {error.toString()}</div>
          }

          return (
            <table className="table">
              <thead class="thead-light">
                <tr>
                  <th>Title</th>
                  <th>Author</th> 
                  <th>Available</th>
                  <th>Change Availability</th>
                </tr>
              </thead>
              {
                data.books.map((b) => {
                  return (
                    <tbody key={b.id}>
                      <Mutation mutation={CHANGE_AVAILABILITY}>
                        {(changeAvailability, { data }) => (
                          <tr>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            {b.available ? (
                              <td className="text-success">{b.available.toString()}</td>
                              ) : (
                              <td className="text-danger">{b.available.toString()}</td>
                            )}
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick = {(e) => {
                                  e.preventDefault();
                                  changeAvailability({
                                    variables: { id: b.id, available: !b.available }
                                  });
                                }}>
                                Change Availablity
                              </button>
                            </td>
                    
                          </tr>
                        )}
                      </Mutation>
                    </tbody>
                  )
                })
              }
            </table>
          )
        }}
      </Query>
    );
  }
}

export default BookList;
