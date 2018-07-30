import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import Login from './Login';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const products = [
  {
    name: 'iPad',
    price: 200
  },
  {
    name: 'iPhone',
    price: 300
  }
]

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: JSON.parse(localStorage.getItem('products')),
      isLogin: false
    };
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;       
  }

  onAdd(name, price) {
    const products = this.getProducts();
    products.push({
      name,
      price
    });
    this.setState({ products });
  }

  onDelete(name) {
    const products = this.getProducts();
    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    this.setState({ products: filteredProducts })
  }

  onEditSubmit(name, price, originalName) {
    let products = this.getProducts();
    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }
      return product;
    });
    this.setState({ products });
  }

  onLogin(isLogin) {
    this.setState({ isLogin:isLogin })
  }
  render() {

    return (
      
      <div className="App">
      <Router>
    <div>
    
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <hr />
      <Login onLogin={this.onLogin} />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>
        <h1>Products Manager</h1>

        <AddProduct
        onAdd={this.onAdd}
        isLogin={this.state.isLogin}
        />
        {  
          this.state.products.map(product => {
            return (
              <ProductItem
                key={product.name}
                {...product}
                onDelete={this.onDelete}
                onEditSubmit={this.onEditSubmit}
                isLogin={this.state.isLogin}
              />
            );
            
          })
        }
      </div>
    );
  }
}

export default App;
