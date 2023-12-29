import React from 'react';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Characters from './components/characters/Characters';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Addcharacter from './components/addcharacter/Addcharacter';
import Mycharacters from './components/mycharacters/Mycharacters';


class App extends React.Component {

  // building a "navigatin" without a library using state and conditional rendering
  state = {
    h1: 'Login/Register',
    showLogin: true,
    showAddCharacter: false,
    showAllCharachters: false,
    showMyCharachers: false,
    showHome: false,
    user: false
  };

  handleLogin  = (getUser) => {
    // alert(getUser.userID)
    // 👇️ take the parameter passed from the Child component
 
    this.setState(
      {
        user: getUser,
      },
      () => {
        // alert(`Hello ${this.state.user.userID}`);
        this.showHome();
      }
    );

  };

  showAddCharacter = () => {
    this.setState(prevState =>
    ({
    h1: `Add Character`,
    showLogin: false,
    showAddCharacter: false,
    showAllCharachters: false,
    showMyCharachers: false,
    showHome: false,
    showAddCharacter:true

    })
    );
  };


  showHome = () => {
    this.setState(prevState =>
    ({
    h1: `Home`,
    showLogin: false,
    showAddCharacter: false,
    showAllCharachters: false,
    showMyCharachers: false,
    showAddCharacter:false, 
    showHome: true

    })
    );
  };

  showAllCharachters = () => {
    this.setState(prevState =>
    ({
    h1: `Charachters`,
    showLogin: false,
    showAddCharacter: false,
    showAllCharachters: true,
    showMyCharachers: false,
    showAddCharacter:false, 
    showHome: false
    })
    );
  };

  showMyCharachers = () => {
    this.setState(prevState =>
    ({
    h1: `My Charachters`,
    showLogin: false,
    showAddCharacter: false,
    showAllCharachters: false,
    showMyCharachers: true,
    showHome: false,
    showAddCharacter:false
    })
    );
  };


  render() {
    let h1 = 'Hello';

    return (
      <>
        <Header heading={this.state.h1} />
        {this.state.user &&
        <p className="button-container">
          <button onClick={this.showHome}>Home</button>
          <button onClick={this.showAllCharachters}>Characters</button>
          <button onClick={this.showMyCharachers}>My Charachters</button>
          <button onClick={this.showAddCharacter}>Add Character</button>
        </p>}

        {/* conditional rendering for components */}
        {this.state.showLogin && <Login handleLogin={this.handleLogin} />}
        {this.state.showAllCharachters && <Characters userID= {this.state.user.userID} />}
        {this.state.showHome && <Home />}
        {this.state.showMyCharachers && <Mycharacters userID= {this.state.user.userID} />}
        {this.state.showAddCharacter && <Addcharacter />}
        {this.state.user && <Footer user={this.state.user.userName} />}
        {!this.state.user && <Footer user="" />}
      </>
    );
  }
  
}


export default App;
