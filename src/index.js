import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker.js'


ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
)

//Help from: Doug Brown
serviceWorker.register();
