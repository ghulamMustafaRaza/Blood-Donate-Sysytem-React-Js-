
export class AuthActions {
    constructor() { }
    static SET_USER = 'SET_USER'
    static UPDATE_PROFILE = 'UPDATE_PROFILE'
    static UPDATE_PROFILE_FULL_FILL = 'UPDATE_PROFILE_FULL_FILL'
    static UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL'

    static LOAD_USER = 'LOAD_USER'
    static LOAD_USER_FULL_FILL = 'LOAD_USER_FULL_FILL'
    static LOAD_USER_FAIL = 'LOAD_USER_FAIL'

    static LOGIN = 'LOGIN'
    static LOGIN_FULL_FILL = 'LOGIN_FULL_FILL'
    static LOGIN_FAIL = 'LOGIN_FAIL'

    static SIGNUP = 'SIGNUP'
    static SIGNUP_FULL_FILL = 'SIGNUP_FULL_FILL'
    static SIGNUP_FAIL = 'SIGNUP_FAIL'
}
Object.keys(AuthActions).map(a => {
    let b = a.split('_').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join('')
    b = b.charAt(0).toLowerCase() + b.slice(1)
    AuthActions[b] = payload => ({ type: a, payload })
})