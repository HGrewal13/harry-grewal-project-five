import React, {Component} from 'react';
import './App.css';
import firebase from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      userInput: '',
      userName: ''
    }
  }

  // 1 reusable method that supports multiple inputs
  handleChange = (event) => {
    console.log('calling handle change', event.target);
    const inputTextValue = event.target.value;
    const inputTextName = event.target.name;
    console.log(inputTextName, inputTextValue);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = (event) => {
    event.preventDefault();
    // DO WE HAVE TO PUT THIS IN FOR ANY REACT METHOD THAT INTERACTS WITH THE FIREBASE DATA?
    const dbRef = firebase.database().ref();

    // 3 push a object to firebase with the name input and item input values
    dbRef.push({
      name: this.state.userName,
      item: this.state.userInput
    });
    this.setState({userInput: ""})
    this.setState({userName: ""})
  }

  handleClaim = (event) => {
    let chosenCard = document.getElementsByClassName('.itemDiv');
    // chosenCard.('claimed
    console.log("Change Color");
  }

  removeItem(itemKey) {
    const dbRef = firebase.database().ref(itemKey);
    dbRef.remove();
  }

  // What does componenet did mount do?
  componentDidMount() {
    const dbRef = firebase.database().ref();
    
    // dbRef.on('value') refers to "when a value is updated on the firebase database?"
    // response refers to "when we get a value update, do this ->"
    dbRef.on('value', (response) => {
      console.log(response.val());
      const newState = [];
      const data = response.val();

      for (let key in data) {
        // 4 grab the data from firebase and push into our state array
        newState.push({
          key: key, 
          name: data[key].name, 
          item: data[key].item}
        );
      }
      this.setState({
        items: newState
      });
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Let's Get Packing !</h1>
        </header>
        <div className="dataOutput wrapper">
          <form action="submit">

            <label htmlFor="person"></label>

            <input
              type="text"
              id="person"
              // 2 add name attribute for the handleChange method
              name="userName"
              onChange={this.handleChange}
              value={this.state.userName} 
              placeholder = "What Is Your Name?"
              required="required"/>

            <label htmlFor="newItem"></label>

            <input 
            type="text" 
            id="newItem" 
            name="userInput"
            onChange={this.handleChange}
            value={this.state.userInput} 
            placeholder = "Add An Item To Bring"
            required="required"/>

            <button type="submit" onClick={this.handleClick}>Add To List</button>

          </form>

          <section className="displayItems">
              {this.state.items.map((item) => {
                return <div key={item.key} className="itemDiv">
                          <div className="item">{item.item}</div>
                          <p>will be brought by {item.name}</p>
                          <button onClick = {() => this.removeItem(item.key)}>Remove Item</button>
                        </div>
              })}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
