import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => {
      const productExists = prevState.cartList.find(
        eachItem => eachItem.id === product.id,
      )
      if (productExists !== undefined) {
        return {
          cartList: prevState.cartList.map(eachItem => {
            if (eachItem.id === product.id) {
              return {
                ...eachItem,
                quantity: eachItem.quantity + product.quantity,
              }
            }
            return eachItem
          }),
        }
      }
      return {cartList: [...prevState.cartList, product]}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(eachItem => {
          if (eachItem.id === id) {
            if (eachItem.quantity > 1) {
              return {...eachItem, quantity: eachItem.quantity - 1}
            }
            return null
          }
          return eachItem
        })
        .filter(item => item !== null),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
