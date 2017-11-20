// @flow
import React, { Component } from 'react';

import createHistory from 'history/createBrowserHistory'

import { Provider } from 'react-redux'

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import {light} from 'material-ui/styles/createPalette';

import cyan from 'material-ui/colors/cyan';
import yellow from 'material-ui/colors/yellow';

import { Root } from './scenes/Root';
import newStore from './store';
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

const history = createHistory()
const store = newStore(history)

class App extends Component<{}> {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Root history={history} />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
