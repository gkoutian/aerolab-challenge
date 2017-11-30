import React from 'react';
import './productsHistory.css';

const productHistory = (props) => {
  const showModalHistory = () => {
    document.body.classList.remove('overflow')
    props.showHistory()
  }
  if(!props.show) {
    return null;
  }
  document.body.classList.add('overflow')
  return (
    <div id="myModal" className="modal-post" onClick={showModalHistory}>
      <div className="modal-content-post" onClick={(e) => e.stopPropagation()}>
        <img className="avatar" src={require('../assets/avatar.png')} alt=""/>
        <h1>{props.user}</h1>
        <h5>Redeems history</h5>
        <button className="boton-history" onClick={showModalHistory}>Volver</button>
        <div className="prod-history">
          {props.productHistory != null 
              
          ?

          props.productHistory.map(item => {
            return (
              <div className="productItem" key={item._id}>
                <div className="productInfo">
                  <img src={item.img.url} alt="" className="imagen"/>
                  <h2 className="productItem-text">{item.name}</h2>    
                </div>
                <div className="productCost">
                  <img src={require('../assets/icons/coin.svg')} alt=""/>
                  <h2 className="productCost-text">{item.cost}</h2>
                </div>
              </div>
            )
          })
          
          :

          <h4>You didnt redeem anything</h4>
          }
        </div>
      </div>
    </div>
  )
}

export default productHistory;