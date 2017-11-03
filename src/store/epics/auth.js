import { AuthActions } from '../actions'
import { Observable } from "rxjs"
import 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { database, auth } from 'firebase';
import store from '../'
export class AuthEpics {
    constructor() { }
    static login = (action$) =>
        action$.ofType(AuthActions.LOGIN)
            .switchMap(({ payload }) =>
                auth().signInWithEmailAndPassword(payload.email, payload.password)
                    .then((authUser) => database()
                        .ref('users/' + authUser.uid)
                        .once('value')
                        .then(a => (
                            AuthActions.loginFullFill({
                                authUser,
                                user: a.val()
                            })
                        ))
                        .catch(e => AuthActions.loginFail(e.message))
                    ).catch(e => AuthActions.loginFail(e.message))
            )
    static signup = (action$) =>
        action$.ofType(AuthActions.SIGNUP)
            .switchMap(({ payload }) =>
                auth().createUserWithEmailAndPassword(payload.email, payload.password)
                    .then((authUser) => database()
                        .ref('users/' + authUser.uid)
                        .set(payload)
                        .then(a => (
                            AuthActions.signupFullFill({
                                authUser,
                                user: payload
                            })
                        ))
                        .catch(e => AuthActions.signupFail(e.message))
                    ).catch(e => AuthActions.signupFail(e.message))
            )
    static updateProfile = (action$) =>
        action$.ofType(AuthActions.UPDATE_PROFILE)
            .switchMap(({ payload }) =>
                database().ref('users/' + auth().currentUser.uid).update(payload)
                    .then(a => AuthActions.updateProfileFullFill(payload))
                    .catch(e => AuthActions.updateProfileFail(e))
            )
}
