import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalAmount = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )
      const totalItems = cartList.length

      return (
        <div className="cart-summary-container">
          <h1 className="order-total-heading">
            Order Total: <span className="order-total">Rs {totalAmount}/-</span>
          </h1>
          <p className="total-items">{totalItems} Items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
