// @flow

import React from 'react';
import { connect } from 'react-redux'

import { About } from "./components/About"
import { fetchFeaturedUser } from "../../services/users/actions"
import { Map } from 'immutable';

type Props = {
  user: Map<string, any>,
  fetchFeaturedUser: () => void,
};

class Container extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.fetchFeaturedUser()
  }

  render() {
    const user = this.props.user.get("data").toJS()
    return (
      <About user={user} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.featuredUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFeaturedUser: () => dispatch(fetchFeaturedUser())
  }
}

export let AboutContainer = connect(mapStateToProps, mapDispatchToProps)(Container)
