import React, { Component } from 'react';
import './App.css';
import config from './config';
import TopBar from './components/topbar';
import NavBar from './components/navbar';
import AddPoints from './components/addPoints';
import ProductHistory from './components/productsHistory';
import ProductList from './components/productlist';

let miInit = { method: 'GET',
headers: {
  "Content-Type": "application/json",  
  "Accept": "application/json",
  "Authorization": config.apiToken  
},
mode: 'cors',
cache: 'default' };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      productsbase: [],
      productHistory: [],
      products: [],
      actualList: [],
      actualpage: 1,
      showHistory: false,
      showModalPoints: false
    }
  }

  componentDidMount() {
    fetch(config.apiUrl + "user/me", miInit)
      .then(data => data.json())
      .then(data => {
        this.setState({
          user: data
        })
      })
    fetch(config.apiUrl + "products ", miInit)
      .then(data => data.json())
      .then(data => {
        let sliceData = data.slice(0, this.state.actualpage * 16)
        this.setState({
          productsbase: data,
          products: data,
          actualList: sliceData
        })
      })
  }

  showHistory = () => {
    if (!this.state.showHistory) {
      fetch(config.apiUrl + "user/history", miInit)
          .then(data => data.json())
          .then(data => {
          this.setState({
              productHistory: data.reverse()
          })
          })
    }
    this.setState({
      showHistory: !this.state.showHistory
    })
  }

  showModalPoints = () => {
    this.setState({
      showModalPoints: !this.state.showModalPoints
    })
  }

  changePoints = (points) => {
    let user = this.state.user;
    user.points += points;
    this.setState({
      user: user
    })
  }

  changePage = (list, page) => {
    this.setState({
      actualList: list,
      actualpage: page
    })
  }
  
  orderList = (list, data) => {
    this.setState({
      products: list,
      actualList: data,
      actualpage: 1
    })
  }

  comprar = (precio) => {
    let user = this.state.user
    user.points -= precio
    this.setState({
      user: user
    })
    
  }

  render() {
    return (
      <div className="App">
        <TopBar 
          user={this.state.user} 
          showModalHistory={this.showHistory} 
          showModalPoints={this.showModalPoints}
        />
        <div className="topImage">
          <div className="topImage-container">
            <h1>Electronics</h1>
          </div>
        </div>
        <NavBar shownav="true" 
          ordenar={this.orderList} 
          onChange={this.changePage} 
          actual={this.state.actualpage} 
          products={this.state.products}
          productsbase={this.state.productsbase}
          total={this.state.productsbase.length} 
        />  
        <ProductList 
          data={this.state.actualList} 
          page={this.state.actualpage} 
          puntos={this.state.user.points} 
          comprar={this.comprar}
        />
        <NavBar shownav="false" 
          onChange={this.changePage} 
          actual={this.state.actualpage} 
          products={this.state.products}
          total={this.state.productsbase.length}
        />
        <ProductHistory 
          show={this.state.showHistory} 
          showHistory={this.showHistory} 
          user={this.state.user.name} 
          productHistory={this.state.productHistory}
        />
        <AddPoints 
          show={this.state.showModalPoints} 
          showModalPoints={this.showModalPoints} 
          changePoints={this.changePoints}
        />      
      </div>
    );
  }
}

export default App;
