import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import NavBar from './NavBar';
import Signin from './Signin';
import Signup from './Signup';
import User from './User';
import Home from './Home';
import Detail from './Detail';
import firebase from 'firebase';
import { connect } from 'react-redux'
import { AuthActions } from '../store/actions'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            to: '/'
        }
    }
    history = {}
    componentDidMount() {
        firebase.auth().onAuthStateChanged(a => {
            this.history.listen(a => a.path === '/user' && !a ? this.setState({ to: '/signin' }) : (a.path === '/signin' || a.path === '/signup') && !a ? this.setState({ to: '/user' }) : null)
            // console.log(a, this.refs.a)
            if (a) {
                this.setState({ to: '/user' })
                firebase.database().ref('users/' + a.uid).once('value').then(b => this.props.dispatchs.setUser({user: b.val(), authUser: a}))
                return
            }
            this.setState({ to: '/' })
            this.props.dispatchs.setUser({user: {}, authUser: {}})
        })
    }
    path = '/'
    route = ({ Component, path, componentProps, ...routProps }) => <Route path={path} {...routProps} component={(props) => {
        this.history = props.history
        return <Component { ...componentProps } { ...props } />
    }} />
    f = true
    render() {
        this.path !== this.state.to && this.history.push(this.state.to)
        this.path = this.state.to
        return (
            <Router>
                <div>
                    {/* {console.log(this.props.blood)} */}
                    <div style={{ display: 'none' }}>
                        {this.path !== this.state.to && <Redirect ref="a" to={this.state.to} />}
                        {this.path = this.state.to}
                    </div>
                    <NavBar first={this.f}/>
                    {this.f = false}
                    <this.route exact path="/" componentProps={{...this.props.donor, blood: this.props.blood}} Component={Home} />
                    <this.route path="/signin" componentProps={{...this.props.auth, login: this.props.dispatchs.login, blood: this.props.blood}} Component={Signin} />
                    <this.route path="/signup" componentProps={{...this.props.auth, ...this.props.donor, ...this.props.dispatchs, blood: this.props.blood}} Component={Signup} />
                    <this.route path="/user" Component={User} componentProps={{...this.props.auth, ...this.props.donor, ...this.props.dispatchs, blood: this.props.blood}} />
                    <this.route path="/detail/:uid" componentProps={this.props.donor} Component={Detail} />
                </div>
            </Router>
        )
    }
}

const mapStateToProps = ({donor, auth, blood}) => ({
    donor,
    auth,
    blood
})
const mapDispatchToProps = (dispatch) => ({
    dispatchs: {
        login: (payload) => dispatch(AuthActions.login(payload)),
        setUser: (payload) => dispatch(AuthActions.setUser(payload)),
        updateProfile: (payload) => dispatch(AuthActions.updateProfile(payload)),
        signup: (payload) => dispatch(AuthActions.signup(payload))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(App)