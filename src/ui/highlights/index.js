import React from 'react'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.fetchUrl = `${props.apiConnectionString}/api/buy`
    this.staticUrl = props.staticFilesConnectionString
    this.handleBuy = this.handleBuy.bind(this)
  }

  handleBuy (e) {
    fetch(this.fetchUrl, {
      body: JSON.stringify({
        product: e.target.dataset['product']
      }),
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.status === 200 ? this._handleSuccess() : this._handleError())
      .catch(() => this._handleError())
  }

  _handleSuccess () {
    window.location.replace('/')
  }

  _handleError () {
    console.error('Buying went wrong on the Server :( Still proceeding...')
  }

  render () {
    const productImages = {
      'product-1': this.staticUrl + '/highlights/things-031.jpg'
    }

    return <div>
      <figure className="product">
        <img src={productImages['product-1']} alt="Pillowhat" />
        <figcaption>A fancy, pancy Pillowhat, all you ever wanted</figcaption>
        <button data-product="product-1" onClick={this.handleBuy} >In den Warenkorb legen</button>
      </figure>

      <figure className="product">
        <img src={productImages['product-1']} alt="Pillowhat" />
        <figcaption>A fancy, pancy Pillowhat, all you ever wanted</figcaption>
        <button data-product="product-1" onClick={this.handleBuy} >In den Warenkorb legen</button>
      </figure>

      <figure className="product">
        <img src={productImages['product-1']} alt="Pillowhat" />
        <figcaption>A fancy, pancy Pillowhat, all you ever wanted</figcaption>
        <button data-product="product-1" onClick={this.handleBuy} >In den Warenkorb legen</button>
      </figure>

      <style jsx>{`
          .product {
            display: inline-block;
            width: 33%;
            padding: 0 .4em;
            box-sizing: border-box;
          }

          div {
            margin-left: -.4em;
            margin-right: -.4em;
          }

          img {
            width: 100%
          }
      `}</style>
    </div>
  }
}
