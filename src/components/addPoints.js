import React from 'react';
import swal from 'sweetalert';
import config from '../config';
import './addPoints.css';

const addPoints = (props) => {
  const showModalPoints = () => {
    document.body.classList.remove('overflow')
    props.showModalPoints()
  }

  const addPoints = (points) => {
    let myPost = { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",  
        "Accept": "application/json",
        "Authorization": config.apiToken  
      },
      body: JSON.stringify({
          "amount": points
      }),
      mode: 'cors',
      cache: 'default' };
    fetch(config.apiUrl + "user/points", myPost)
      .then(data => data.json())
      .then(data => {
        swal({
          title: "Points Added!",
          text: "You can continue viewing products",
          icon: "success",
          button: "Great!",
        })
        props.changePoints(points)
        document.body.classList.remove('overflow')
        props.showModalPoints()
      })
    }

    if(!props.show) {
      return null;
    }   
    document.body.classList.add('overflow')
    return (
      <div id="myModal" className="modal-post" onClick={showModalPoints}>
        <div className="modal-content-post" onClick={(e) => e.stopPropagation()}>
          <h1>Add points for testing!</h1>
          <div className="points-list">
            <button className="points-button" onClick={() => {addPoints(1000)}}>Add 1000</button>
            <button className="points-button" onClick={() => {addPoints(5000)}}>Add 5000</button>
            <button className="points-button" onClick={() => {addPoints(7500)}}>Add 7500</button>
          </div>
        </div>
      </div>
    )
}

export default addPoints;