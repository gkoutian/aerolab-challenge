import React from 'react';
import './topbar.css';

const TopBar = (props) => {
    const showModalHistory = () => {
        props.showModalHistory()
    }

    const showModalPoints = () => {
        props.showModalPoints()
    }

    return (
      <div className="header"> 
        <div className="header-container">
          <img className="logo-aerolab" src={require("../assets/aerolab-logo.svg")} alt=""/>
          <div className="datos">
            <h5 onClick={showModalHistory} className="user">{props.user.name}</h5>
            <div className="user-points" onClick={showModalPoints}>
              <img src={require("../assets/icons/coin.svg")} alt=""/>
              <h5>{props.user.points}</h5>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TopBar;