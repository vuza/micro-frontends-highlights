import React from 'react'
import { hydrate } from 'react-dom'
import App from './index'

hydrate(<App {...window.__APP_INITIAL_HIGHLIGHT_STATE__} />, document.getElementById('highlightRoot'))
