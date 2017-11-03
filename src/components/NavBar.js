import React,{PureComponent} from 'react';
import {AppBar, FlatButton, CircularProgress} from 'material-ui';
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'

class Logged extends PureComponent{
    static muiName = 'FlatButton'
    render(){
        return(
            <div>
                <Link to="/" ><FlatButton  {...this.props} label="Donors"/></Link>
                <Link to="/user" ><FlatButton  {...this.props} label="Update Your Profile"/></Link>
                <FlatButton onClick={() => {
                        firebase.auth().signOut()
                }} {...this.props} label="LogOut" />
            </div>
        )
    }
}

class UnLogged extends React.PureComponent{
    static muiName = 'FlatButton'
    render(){
        return(
            <div>
                <Link to="/" ><FlatButton  {...this.props} label="Donors"/></Link>
                <Link to="/signin" ><FlatButton  {...this.props} label="Login" /></Link>
                <Link to="/signup" ><FlatButton  {...this.props} label="Register As A Donor"/></Link>
            </div>
        )
    }
}
class NavBar extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            logged : false
        }
    }
    componentDidMount(){

        firebase.auth().onAuthStateChanged(() => {
            if(firebase.auth().currentUser){
                this.setState({
                    logged:true
                })
            }
            else{
                this.setState({
                    logged:false
                })
            }
        })
    }
    render(){
        return(
            <div>
                <AppBar
                    style={{ position: "fixed", top: 0, left: 0, right: 0 }}
                    zDepth={1}
                    title="Blood App"
                    titleStyle={{cursor:'pointer'}}
                    iconElementLeft={<span></span>}
                    iconElementRight={this.props.first ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', marginTop: -4 }}><CircularProgress color="white" size={30}/></span> :this.state.logged ? <Logged /> : <UnLogged />}
                />
            </div>
        )
    }
}
export default NavBar