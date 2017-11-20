// @flow
import React from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { User } from '../../../../../services/users/models'

type Props = {
  user: User
}

const styles = theme => ({
  flex: {
    flex: 1
  }
});

export class About extends React.Component<Props> {
  render() {
    return (
      <header>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" className={styles.flex}>
              {this.props.user.name}
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      );
  }
}
