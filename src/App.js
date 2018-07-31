import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import randtoken from 'rand-token'

import ProductItem from './ProductItem'
import AddProduct from './AddProduct'
import Login from './Login'

const users = [
  {
    username: 'aaa',
    password: 123456
  },
  {
    username: 'bbb',
    password: 123456
  }
]

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

localStorage.setItem('users', JSON.stringify(users))
localStorage.setItem('products', JSON.stringify(products))

const Home = (props) => {
  return (
    <div>
      <h1>Home</h1>
      {props.isToken ? <AddProduct onAdd={props.onAdd} /> : null}
      {
        props.products.map(product => {
          return (
            <ProductItem
              key={product.name}
              {...product}
              onDelete={props.onDelete}
              onEditSubmit={props.onEditSubmit}
              isToken={props.isToken}
            />
          )
        })
      }
    </div>
  )
}

const About = () => (
  <div>
    <h1>About</h1>
  </div>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isToken: !!sessionStorage.getItem('token'),
      products: JSON.parse(localStorage.getItem('products')),
      showPopup: false
    }
    this.onAdd = this.onAdd.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onEditSubmit = this.onEditSubmit.bind(this)
    this.showPopup = this.showPopup.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  componentWillMount () {
    const products = this.getProducts()
    this.setState({ products })
  }

  getUsers () {
    return JSON.parse(localStorage.getItem('users'))
  }

  getProducts () {
    return this.state.products
  }

  onAdd (name, price) {
    const products = this.getProducts()
    products.push({
      name,
      price
    })
    this.setState({ products })
  }

  onDelete (name) {
    const products = this.getProducts()
    const filteredProducts = products.filter(product => {
      return product.name !== name
    })
    this.setState({ products: filteredProducts })
  }

  onEditSubmit (name, price, originalName) {
    let products = this.getProducts()
    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name
        product.price = price
      }
      return product
    })
    this.setState({ products })
  }

  showPopup () {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  onLogin (username, password) {
    let users = this.getUsers()

    users.filter(user => {
      if (user.username === username && user.password === parseInt(password, 0)) {
        // Generate a 16 character alpha-numeric token:
        const token = randtoken.generate(16)
        sessionStorage.setItem('token', token)
        this.setState({ isToken: !this.state.isToken })
        this.setState({
          showPopup: !this.state.showPopup
        })
      }
      return user
    })
  }

  onLogout () {
    sessionStorage.removeItem('token')
    this.setState({ isToken: !this.state.isToken })
  }

  render () {
    return (

      <div className='App'>
        <Router>
          <div>

            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
            </ul>

            <hr />

            {this.state.isToken ? <button onClick={this.onLogout}>Log out</button> : <button onClick={this.showPopup}>Log in</button>}

            <Route exact path='/' render={() => <Home onAdd={this.onAdd} onDelete={this.onDelete}
              onEditSubmit={this.onEditSubmit} isToken={this.state.isToken} products={this.state.products} />} />
            <Route exact path='/about' component={About} />

            {
              this.state.showPopup
                ? <Login onLogin={this.onLogin} />
                : null
            }
          </div>
        </Router>
      </div>
    )
  }
}

export default App
