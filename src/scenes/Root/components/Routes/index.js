// @flow

import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'

import { AboutContainer } from '../../scenes/About';

type Props = {
  history: any,
}

export class Routes extends React.Component<Props> {
  render() {
    const history = this.props.history

    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={AboutContainer} />
        </div>
      </ConnectedRouter>
    )
  }
}
