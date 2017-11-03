import React from 'react'
import { RaisedButton, MenuItem } from 'material-ui'
import Loader from './Loader'
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator, DateValidator } from 'react-material-ui-form-validator';

export default class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            group: '',
            name: '',
            location: '',
            dateOfBirth: null
        }
    }
    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signup(this.state)
    }
    handleChangeM = (a) => (ev, date, value) => {
        this.setState({
            [a]: value || date || ev.target.value
        })
    }
    render() {
        return (
            this.props.isLoading ?
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
                    <TextValidator
                        value={this.state.email}
                        floatingLabelText="Email"
                        onChange={this.handleChangeM('email')}
                        name="email"
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <TextValidator
                        value={this.state.password}
                        floatingLabelText="Password"
                        onChange={this.handleChangeM('password')}
                        name="pass"
                        type="password"
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
                    {this.props.error && this.props.error}
                    <RaisedButton label="SignUp" primary={true} type="submit" />
                    <RaisedButton label="Already A Account" onClick={() => {
                        this.props.history.push('/login')
                    }} default={true} type="submit" />

                </ValidatorForm>
        )
    }
}