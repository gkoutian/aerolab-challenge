import React from 'react';
import './productlist.css';
import swal from 'sweetalert';
import config from '../config';

const ProductList = (props) => {
  const comprar = (precio, id) => {
    let myRedeem = { method: 'POST',
    headers: {
      "Content-Type": "application/json",  
      "Accept": "application/json",
      "Authorization": config.apiToken  
    },
    body: JSON.stringify({
      "productId": id
    }),
    mode: 'cors',
    cache: 'default' };
    fetch(config.apiUrl + "redeem", myRedeem)
      .then(data => data.json())
      .then(data => {
        props.comprar(precio)
        swal({
          title: "Product redeemed!",
          text: "You can continue viewing products",
          icon: "success",
          button: "Great!",
        })
      })
  }

  return (
    <div>
      <div className="product-grid-container"> {
        props.data.map(item => {
          return (
            <div className="product-item" key={item._id}>
              <img src={item.img.url} alt="" className="imagen-producto"/>
              <h3 className="cat-prod">{item.category}</h3>
              <h1>{item.name}</h1>
              { item.cost > props.puntos

                ?

                <div className="hover alert">
                  <div className="hover-cost">
                    <img src={require("../assets/icons/coin.svg")}  alt=""/>
                    <h3 >{item.cost}</h3>
                  </div>  
                  <button >Not Enough Points</button>
                </div>

                :

                <div className="hover">
                  <div className="hover-cost">
                    <img src={require("../assets/icons/coin.svg")}  alt=""/>
                    <h3 >{item.cost}</h3>
                  </div>  
                  <button onClick={() => {comprar(item.cost, item._id)}}>Redeem Now</button>
                </div>
              }
              
              <div className="icon">
                { item.cost > props.puntos 

                  ?
                  <div className="icon-error">
                    <h5>You need {item.cost - props.puntos}</h5>
                    <img src={require("../assets/icons/coin.svg")} alt=""/> 
                  </div>
                      
                  :
                  
                  <img src={require("../assets/icons/buy-blue.svg")} alt=""/>
                }
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default ProductList;