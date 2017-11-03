import React from 'react'
import { RaisedButton, MenuItem, FlatButton, Dialog } from 'material-ui'
import Loader from './Loader'
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
    // console.log({
    //   group,
    //   name,
    //   location,
    //   dateOfBirth
    // }, props)

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
    // console.log({
    //   group,
    //   name,
    //   location,
    //   dateOfBirth
    // })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.check()) {
      this.handleOpen()
    }
  }
  handleChangeM = (a) => (ev, date, value) => {
    this.setState({
      [a]: value || date || ev.target.value
    })
  }

  handleOpen = () => {
    this.open = true;
    this.forceUpdate();
  };

  handleClose = () => {
    this.open = false;
    this.forceUpdate();
  };
  modalSubmit = () => {
    this.handleClose()
    this.props.updateProfile(this.state)    
  }
  check = () => {
    let a = this.state
    let b = this.props.user
    b.dateOfBirth = b.dateOfBirth ? new Date(b.dateOfBirth) : new Date()
    a.dateOfBirth = a.dateOfBirth ? new Date(a.dateOfBirth) : new Date()
    return a.name === b.name && a.location === b.location && a.group === b.group && a.dateOfBirth.toLocaleDateString() === b.dateOfBirth.toLocaleDateString()
  }
  open = false
  render() {
    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onClick={this.modalSubmit}
      />,
    ];
    return (
      this.props.updateIsLoading || this.props.isLoading ?
        <Loader fullpage={true} />
        :
        <ValidatorForm onSubmit={this.handleSubmit} className="login">
          <h3>Update Your Profile</h3>
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
            {this.props.blood['blood-groups'].map((a) => <MenuItem key={a} value={a} primaryText={a} />)}
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
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.open}
          >
            Are You Sure To Update Your Profile
          </Dialog>
        </ValidatorForm>
    )
  }
}