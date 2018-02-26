const config = require('config')
const request = require('request-promise-native')

const api = {
  handleBuy: (req, res) => {
    _getUser(req.cookies.token)
      .then(user => request({
        method: 'post',
        body: {product: req.body.product, user: user.name},
        json: true,
        url: `${config.get('cartServiceConnectionString')}/api/product`
      }))
      .then(() => res.end())
      .catch(() => res.status(500).end())
  }
}

const _getUser = token => {
  let requestUserData = () => Promise.resolve()

  if (token) {
    requestUserData = () => request(`${config.get('userServiceConnectionString')}/api/user/${token}`)
  }

  return requestUserData()
    .then(data => data ? JSON.parse(data) : {})
    .catch(() => {
      console.error(`Error catching user data on ${config.get('userServiceConnectionString')}/api/user/${token}`)
      return {}
    })
}

module.exports = api
