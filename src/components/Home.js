import React, { Component } from 'react';
import Loader from './Loader';
import { List, ListItem } from 'material-ui/List';
import { IconButton, SelectField, MenuItem } from 'material-ui'
import ActionInfo from 'material-ui/svg-icons/action/info';

export default class Home extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      donors: [...props.donors],
      group: 'all'
    }
  }
  onChange = (__, _, group) => { this.setState({ group }) }
  arr = () => (
    this.state.group === 'all' ?
      this.state.donors
      :
      this.state.donors
        .filter(a => this.props.blood['patients-acceps'][this.state.group].indexOf(a.group.toUpperCase()) !== -1)
  )
  render() {
    return (
      this.props.isLoading ? <Loader fullpage /> :
        <div>
          <div
            style={{ padding: 10 }}>
            <h1>Find Donors</h1>
            <SelectField
              floatingLabelText="Your Blood Group"
              onChange={this.onChange}
              value={this.state.group}
              fullWidth
            >
              <MenuItem key={'all'} value={'all'} primaryText={'All'} />
              {this.props.blood['blood-groups'].map((a) => <MenuItem key={a} value={a} primaryText={a} />)}
            </SelectField>
            {this.state.group !== 'all' && <h3>These Pepole Are Able to Donate App For { this.state.group } </h3>}
          </div>
          <List>
            {this.arr().map((a, i) => (
              <ListItem key={i} primaryText={a.name.toUpperCase() + ' | ' + a.group.toUpperCase()} rightIcon={<span><IconButton onClick={() => setTimeout(() => this.props.history.push('/detail/' + a.key), 200)} style={{ margin: -12 }}><ActionInfo color="#777" /></IconButton></span>} />
            ))}
          </List>
        </div>
    )
  }
}
