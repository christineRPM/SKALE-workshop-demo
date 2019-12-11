import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import {getWeb3 } from './util/web3/getWeb3'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Images
import skale_logo from './assets/Skale_Logo_White.png'
import bg from './assets/demo-background.png'

// Styles
import './css/button-toggle.scss'
import './App.scss'

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {  
  console.log('Error in web3 initialization.')
})

class App extends Component {

  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div className="navbar-nav d-block ml-auto">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto justify-content-end">
            <li className="nav-item">
              <Link to="/demo" activeClassName="active" className="nav-link">Games</Link>
            </li>
            <LogoutButtonContainer />
          </ul>            
        </div>
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <ul className="navbar-nav ml-auto justify-content-end">
        <LoginButtonContainer />
      </ul>
    )

    return (
      <div className="App" style={{backgroundImage: 'url(' + bg + ')'}}>
        <div className="background-blur"></div>
        <div className="content">
        <div className="header">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <Link to="/" className="navbar-brand">
              <img className="logo" alt="SKALE" src={skale_logo}/>
            </Link>
            <OnlyGuestLinks />
            <OnlyAuthLinks />            
          </nav>
        </div>
          <div className="contentWindow h-100">
          {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App
