import React from 'react';
import UserList from './components/UserList';
import UserAddForm from './components/UserAddForm';
import PostList from './components/PostList';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: "#011627",
      color: "#FDFFFC",
      users: [],
      showUsers: true,
      showPosts: false,
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.filter(user => user.id < 8);
        data.forEach(user => {
          user.isGoldClient = false;
        });
        this.setState({users: data});
      })
  }

  changeColor(event) {
    this.setState({background: event.target.value});
  }

  changeTextColor(event) {
    this.setState({color: event.target.value})
  }

  getMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  showUsers() {
    this.setState({showUsers: true, showPosts: false})
  }

  showPosts() {
    this.setState({showPosts: true, showUsers: false})
  }

  deleteUser(userId) {
    this.setState(prevState => {
      return {
        users: prevState.users.filter(users => users.id !== userId)
      }
    });
  }

  submitAddForm(event, name, email, isGoldClient, salary, image) {
    event.preventDefault();
    this.setState(prevState => {
      return {
        users: [
          ...prevState.users,
          {
            id: this.getMaxId(prevState.users) + 1,
            name,
            email,
            isGoldClient,
            salary,
            image
          }
        ]
      }
    });
  }

  render() {
    return(
      <div className="app" style={{background: this.state.background, color: this.state.color}}>
        <h1>Admin panel folosind React</h1>
        
        <UserAddForm submitAddForm={(event, name, email, isGoldClient, salary, image) => this.submitAddForm(event, name, email, isGoldClient, salary, image)}/>

        <div className="switchView">
          {this.state.showPosts && <button onClick={() => this.showUsers()}>Afisare utilizatori</button>}
          {this.state.showUsers && <button onClick={() => this.showPosts()}>Afiseaza postari</button>}
        </div>

        <div className="options">
          <label htmlFor="backgroundColor">Culoare background:</label>
          <input 
            type="color"
            name="backgroundColor"
            value={this.state.background}
            onChange={(event) => this.changeColor(event)}
          />
          <label htmlFor="textColor">culoare text:</label>
          <input 
            type="color"
            name="textColor"
            value={this.state.color}
            onChange={(event) => this.changeTextColor(event)}
          />
        </div>  
        {this.state.showUsers && <UserList users={this.state.users} deleteUser={(userId) => this.deleteUser(userId)}/>}
        {this.state.showPosts && <PostList />}

      </div>
    );
  }
}

export default App;