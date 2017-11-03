import React from 'react'
import { RaisedButton } from 'material-ui'
import Loader from './Loader'
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';

export default class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let { email, password } = this.state
        this.props.login({email, password})
    }
    handleChangeM = (a) => (ev) => {
        this.setState({
            [a]: ev.target.value
        })
    }
    render() {
        return (
            this.props.isLoading ?
                <Loader fullpage={true} />
                :
                <ValidatorForm onSubmit={this.handleSubmit} className="login">
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
                    {this.props.error && this.props.error}
                    <RaisedButton label="Login" primary={true} type="submit" />
                    <RaisedButton label="Not A Account" onClick={() => {
                        this.props.history.push('/signup')
                    }} default={true} type="submit" />

                </ValidatorForm>
        )
    }
}