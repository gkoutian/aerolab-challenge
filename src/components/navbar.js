import React from 'react';
import './navbar.css';

const navbar = (props) => {
  const changePage = (direccion) => {
    let actual = props.products.map(item => item);
    if (direccion === 'adelante') {
      let largolista = props.products.length;
      let actuallista = props.actual * 16;
      let proxlista = (props.actual + 1) * 16;
      if (actuallista < largolista) {
        let sliceData = actual.slice(actuallista, proxlista)
        props.onChange(sliceData, (props.actual + 1))
      }
    } else {
      if (props.actual !== 1) {
        let actuallista = (props.actual - 1) * 16;
        let antlista = (props.actual - 2) * 16;
        let sliceData = actual.slice(antlista, actuallista);
        props.onChange(sliceData, (props.actual - 1))
      }
    }
  }

  const orderList = (e) => {
    let order = document.getElementsByClassName('order');
    order = order[0].children;
    order[1].classList.remove('active');
    order[2].classList.remove('active');
    order[3].classList.remove('active');
    e.target.classList.add('active');
    let products = props.productsbase.map(item => item)
    let newList = []
    let sliceData = []
    switch(e.target.classList[0]) {
      case 'recent':
        newList = products;
        sliceData = newList.slice(0, 16)
        props.ordenar(newList, sliceData)
        break;
      case 'low':
        newList = products;
        sliceData = newList
                    .sort((a,b) => a.cost - b.cost)
                    .slice(0, 16)
        props.ordenar(newList, sliceData)
        break;  
      case 'high':
        newList = products;
        sliceData = newList
                    .sort((a,b) => b.cost - a.cost)
                    .slice(0, 16)
        props.ordenar(newList, sliceData)
        break;
      default: 
        break;
    }
  }

  return (
    <div className="nav">
      <div className="nav-container">
        <h3 className="pages">{props.actual * 16} of {props.total} products</h3>
        {props.shownav === "true" 
        
        ?
        
        <div className="order">
          <span>Sort by:</span>
          <button onClick={orderList} className="recent active">Most Recent</button>
          <button onClick={orderList} className="low">Lowest Price</button>
          <button onClick={orderList} className="high">Highest Price</button>
        </div>
        
        :
        
        null
        }
        <div className="botones">
          <img className="atras" src={require("../assets/icons/arrow-left.svg")} onClick={() => changePage('atras')} alt=""/>
          <img className="adelante" src={require("../assets/icons/arrow-right.svg")} onClick={() => changePage('adelante')} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default navbar;