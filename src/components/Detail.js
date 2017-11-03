import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { FlatButton, Divider } from 'material-ui';
import Loader from './Loader';

export default class User extends React.PureComponent {
  render() {
    return (
      this.props.isLoading ? <Loader fullpage /> :
        this.props.raw[this.props.match.params.uid] ?
          <div>
            {/* <h1>Detail Works</h1> */}
            <div style={{
              maxWidth: 500,
              margin: '100px auto'
            }}>
              {this.card(this.props.raw[this.props.match.params.uid])}
            </div>
          </div>
          :
          <div>
            <h1>No User Found</h1>
          </div>
    )
  }
  card = (user) => (
    <Card>
      <CardHeader
        title={user.name.toUpperCase()}
        subtitle={"Blood Group " + user.group.toUpperCase()}
        avatar={user.img || '/user.png'}
      />
      <Divider />
      <CardText>
        <pre> Location:&#9; &#9; &#9; &#9; &#9; &#9; &#9; &#9; &#9;{user.location} <br/></pre>
        <pre> Email:  &#9; &#9; &#9; &#9; &#9; &#9; &#9; &#9; &#9; {user.email} <br/></pre>
        <pre> Date Of Birth:  &#9; &#9; &#9; &#9; &#9; {user.dateOfBirth} <br/></pre>
      </CardText>
      <Divider />
      <CardActions>
        <FlatButton label="Call" />
        <FlatButton label="Email" />
      </CardActions>
    </Card>

  )
}
