import React from 'react'
import axios from 'axios'

const AddToCartButton = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addingToCart: false,
      addToCartError: false,
      cart: {
        currency: {},
        cartAmount: 0,
        lineItems: {},
        numberItems: 0,
        redirectUrls: {},
      },
    }
  }

  addToCart = () => {
    this.setState({ addingToCart: true })
    axios
      .post(`/.netlify/functions/hello?endpoint=carts`, {
        line_items: [
          {
            quantity: 1,
            product_id: this.props.productId,
          }
        ]
      })
      .then(response => {
        const lineItems = response.data.data.line_items;
        const cartAmount = response.data.data.cart_amount;
        const currency = response.data.data.currency;

        this.setState({
          loading: false,
          cart: {
            currency,
            cartAmount,
            lineItems,
            numberItems: lineItems.physical_items.length + lineItems.digital_items.length + lineItems.custom_items.length + lineItems.gift_certificates.length,
            redirectUrls: response.data.data.redirect_urls,
          },
        })
      })
      .catch(error => {
        this.setState({ addingToCart: false, addToCartError: error })
      })
  }

  function handleAddToCartClick(e) {
    e.preventDefault();
    this.addToCart();
  }

  function handleLoadingAddToCartClick(e) {


  render() {
    const { currency, cartAmount, lineItems, numberItems, redirectUrls } = this.state.cart

    return (
      <div>
        {this.state.addingToCart ? (
          <button class="bc-btn bc-btn--form-submit bc-btn--add_to_cart" type="submit" onClick={handleLoadingAddToCartClick}>Adding to Cart...</button>
        ) : (
          <button class="bc-btn bc-btn--form-submit bc-btn--add_to_cart" type="submit" onClick={handleAddToCartClick}>Add to Cart</button>
        )}
      </div>
    )
  }
}

export default AddToCartButton