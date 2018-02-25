import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import R from './router'
import Site from './reducers'

let store = createStore(Site)

let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <R />
  </Provider>,
  rootElement
)
