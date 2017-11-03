import React, { Component } from 'react';
import Loader from './Loader';
import { List, ListItem } from 'material-ui/List';
import { IconButton } from 'material-ui'
import ActionInfo from 'material-ui/svg-icons/action/info';

export default class Home extends React.PureComponent {
  render() {
    return (
      this.props.isLoading ? <Loader fullpage /> :
        <div>
          <h1>Home Works</h1>
          <List>
            {this.props.donors.map((a, i) => (
              <ListItem key={i} primaryText={a.name.toUpperCase() + ' | ' + a.group.toUpperCase()} rightIcon={<span><IconButton onClick={() => setTimeout(() => this.props.history.push('/detail/' + a.key), 200)} style={{ margin: -12 }}><ActionInfo color="#777" /></IconButton></span>} />
            ))}
          </List>
        </div>
    )
  }
}
