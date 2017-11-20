// Flow
import React, { Component } from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import {light} from 'material-ui/styles/createPalette';

import cyan from 'material-ui/colors/cyan';
import yellow from 'material-ui/colors/yellow';

import { AboutContainer } from './scenes/About';
import {reducer} from './services/reducer';
import './App.css';

const theme = createMuiTheme({palette: createPalette(light)});
theme.palette.primary = cyan
theme.palette.secondary = yellow

// Small hack to force the text to be white (official Google guidelines say it
// should be dark for Cyan, but it looks bad)
// https://github.com/callemall/material-ui/issues/8183
var originalGetContrastText = theme.palette.getContrastText
theme.palette.getContrastText = color => {
  if (color === theme.palette.primary[500]) {
    return theme.palette.common.white
  }
  return originalGetContrastText(color)
}

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <AboutContainer />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
