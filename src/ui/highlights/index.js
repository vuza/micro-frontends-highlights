import React from 'react'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.loggedIn = !!props.token
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
      'product-1': this.staticUrl + '/highlights/things-031.jpg',
      'product-2': this.staticUrl + '/highlights/9212174_orig.jpg',
      'product-3': this.staticUrl + '/highlights/useless-object-design-the-unusable-katerina-kamprani-2.jpg'
    }

    const buttonText = this.loggedIn ? 'In den Warenkorb legen' : 'Zum Shoppen anmelden'

    return <div>
      <figure className="product">
        <img src={productImages['product-1']} alt="Pillow Hat" />
        <figcaption>A Pillow Hat :O</figcaption>
        <button data-product="product-1" onClick={this.handleBuy} disabled={!this.loggedIn}>{buttonText}</button>
      </figure>

      <figure className="product">
        <img src={productImages['product-2']} alt="Pillowhat" />
        <figcaption>I WANT COOKIES</figcaption>
        <button data-product="product-2" onClick={this.handleBuy} disabled={!this.loggedIn} >{buttonText}</button>
      </figure>

      <figure className="product">
        <img src={productImages['product-3']} alt="Pillowhat" />
        <figcaption>Free your toes</figcaption>
        <button data-product="product-3" onClick={this.handleBuy} disabled={!this.loggedIn} >{buttonText}</button>
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

          button {
            cursor: pointer;
            border: 1px solid black;
            text-transform: uppercase;
            background: #ff6961;
            width: 100%;
          }

          button:hover {
            background:white;
          }
      `}</style>
    </div>
  }
}
