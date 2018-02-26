const React = require('react')
const { renderToString } = require('react-dom/server')
const { flushToHTML } = require('styled-jsx/server')
const cheerio = require('cheerio')
import App from './highlights'
const config = require('config')
const AWS = require('aws-sdk')

const awsCredentialsFilePath = config.get('aws.credentialsFilePath')
const awsS3Bucket = config.get('aws.s3Bucket')

if (awsCredentialsFilePath) {
  AWS.config.loadFromPath(awsCredentialsFilePath)
}

const s3 = new AWS.S3()

const ui = {
  serveUi: (req, res) => {
    const data = {apiConnectionString: config.get('apiConnectionString'), staticFilesConnectionString: config.get('staticFilesConnectionString')}

    const html = renderToString(
      <App {...data} />
    )

    const styles = flushToHTML()
    const $ = cheerio.load(styles)
    const cssHash = $('style').attr('id')

    doesCssExist(cssHash)
      .then(exists => {
        if (!exists) {
          return persistCss(cssHash, $('style').html())
        }
      })
      .then(() => {
        res.set({
          // Link: `<${view.css}>; rel="stylesheet", <${view.js}>; rel="fragment-script"`,
          Link: `<${config.get('staticFilesConnectionString')}/highlights/highlights/bundle.js>; rel="fragment-script", <http://${awsS3Bucket}.s3-website-us-east-1.amazonaws.com/${cssHash}.css>; rel="stylesheet"`,
          'Content-Type': 'text/html'
        })
      })
      .then(() => res.end(`<script>window.__APP_INITIAL_HIGHLIGHT_STATE__ = ${JSON.stringify(data)}</script><span id="highlightRoot">${html}</span>`))
  }
}

const doesCssExist = name => new Promise((resolve, reject) => {
  s3.headObject({Bucket: awsS3Bucket, Key: `${name}.css`}, (err, data) => {
    if (err) {
      if (err.code === 'NotFound') {
        return resolve(false)
      }

      return reject(err)
    }

    resolve(true)
  })
})

const persistCss = (name, content) => new Promise((resolve, reject) => {
  s3.putObject({
    Body: content,
    Bucket: awsS3Bucket,
    Key: `${name}.css`,
    ContentType: 'text/css',
    ACL: 'public-read'
  }, (err, data) => {
    if (err) {
      return reject(err)
    }

    resolve()
  })
})

module.exports = ui
