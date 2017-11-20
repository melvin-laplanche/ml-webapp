// @flow

import React, { Component } from 'react'
import { Routes } from './components/Routes';

type Props = {
  history: any,
}

export class Root extends Component<Props> {
  render() {
    return (
      <div>
        <Routes history={this.props.history} />
      </div>
    )
  }
}
