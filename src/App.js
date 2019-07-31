import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { list: [], details: null, isLoading: false, err: null};
  }
 
  componentDidMount() {
    this.setState({ isLoading: true });
    axios({ method: 'get', url: 'https://api.github.com/users?per_page=100' })
      .then(response => {
        console.log(response);
        this.setState({ isLoading: false, list: response.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ err: err, isLoading: false });
      });
  };
  handleClick = (login) => {
    axios.get( `https://api.github.com/users/${login}` )
      .then(response => {
        console.log(response);
        this.setState({ details: response.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ err: err });
      });
  };
  
  render() {
    const { list, details, isLoading, err } = this.state;
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    else {
      return (
        <div className='container'>
          {err && <h1>Error Occured</h1>}
          <div>
            <h2>List</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>username</th>
                  <th>image</th>
                </tr>
              </thead>
              <tbody>
                {list.map((user, index) => {
                  return (
                    <tr key = {user.id} onClick = {() => this.handleClick(user.login)}>
                      <td>{user.id}</td>
                      <td>{user.login}</td>
                      <td>
                        <img src = {user.avatar_url} alt = {`${user.login} avatar`}/>
                      </td>
                    </tr>
                  );
                })
                }
              </tbody>
            </table>
          </div>
          
          <div>                                                                                                                       
            <h2>Detail</h2>
            <div className='detail'>
              {details && <div>
                  <p>{`name: ${details.name}`}</p>
                  <p>{`location: ${details.location}`}</p>
                  <p>{`following: ${details.following}`}</p>
                  <p>{`followers: ${details.followers}`}</p>
              </div>}
            </div>
          </div>
        </div>
      );
    }
  }
}
export default App;
