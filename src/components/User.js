import React from 'react'
import { RaisedButton, MenuItem } from 'material-ui'
import Loader from './Loader'
import * as firebase from 'firebase'
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator, DateValidator } from 'react-material-ui-form-validator';

export default class User extends React.PureComponent {
  constructor(props) {
    super(props)
    let {
      group,
      name,
      location,
      dateOfBirth
    } = props.user
    this.state = {
      group,
      name,
      location,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : {}
    }
    console.log({
      group,
      name,
      location,
      dateOfBirth
    }, props)

  }
  componentWillReciveProps(nextProps) {
    let {
      group,
      name,
      location,
      dateOfBirth
    } = nextProps.user
    this.setState({
      group,
      name,
      location,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : {}
    })
    console.log({
      group,
      name,
      location,
      dateOfBirth
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.check()) {
      this.props.updateProfile(this.state)
    }
  }
  handleChangeM = (a) => (ev, date, value) => {
    this.setState({
      [a]: value || date || ev.target.value
    })
  }
  check = () => {
    let a = this.state
    let b = this.props.user
    b.dateOfBirth = b.dateOfBirth ? new Date(b.dateOfBirth) : new Date()
    return a.name === b.name && a.location === b.location && a.group === b.group && a.dateOfBirth.toLocaleDateString() === b.dateOfBirth.toLocaleDateString()
  }
  render() {
    return (
      this.props.updateIsLoading || this.props.isLoading ?
        <Loader fullpage={true} />
        :
        <ValidatorForm onSubmit={this.handleSubmit} className="login">
          <TextValidator
            value={this.state.name}
            floatingLabelText="Name"
            onChange={this.handleChangeM('name')}
            name="name"
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <TextValidator
            value={this.state.location}
            floatingLabelText="Location"
            onChange={this.handleChangeM('location')}
            name="location"
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <SelectValidator
            floatingLabelText="Group"
            name="group"
            validators={['required']}
            errorMessages={['this field is required']}
            onChange={this.handleChangeM('group')}
            value={this.state.group}
          >
            <MenuItem value="A+" primaryText="A+" />
            <MenuItem value="B+" primaryText="B+" />
            <MenuItem value="C+" primaryText="C+" />
            <MenuItem value="D+" primaryText="D+" />
            <MenuItem value="E+" primaryText="E+" />
          </SelectValidator>
          <DateValidator
            autoOk
            name="dateOfBirth"
            validators={['required']}
            errorMessages={['this field is required']}
            onChange={this.handleChangeM('dateOfBirth')}
            value={this.state.dateOfBirth}
            floatingLabelText="Date Of Birth"
          ></DateValidator>
          {this.props.updateError && this.props.updateError}
          <RaisedButton disabled={this.check()} label="Update Profile" primary={true} type="submit" />
        </ValidatorForm>
    )
  }
}