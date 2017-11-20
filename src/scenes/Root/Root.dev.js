// @flow

import React, { Component } from 'react'

import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

import { Routes } from './components/Routes';


export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' changeMonitorKey='ctrl-m' defaultIsVisible={false}>
    <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
  </DockMonitor>
)

type Props = {
  history: any,
}
export class Root extends Component<Props> {
  render() {
    return (
      <div>
        <Routes history={this.props.history} />
        <DevTools />
      </div>
    )
  }
}
