import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
// import { configureStore } from '../store';
import { configureStore } from '../redux/store'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    // responseType: 'token id_token',
    scope: 'openid'
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  // This hasn't run yet
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        //localStorage.setItem("user_id", "user-id");
        //console.log(configureStore)
        let store = configureStore()
        store.dispatch({ type: 'LOGIN_USER_SUCCESS', payload: authResult })
        window.location.replace('/')
      } else if (err) {
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession(authResult) {
    // console.log('what is authResult', authResult)
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expires * 1000 + new Date().getTime()
    )
    // console.log('what is expiresAt', expiresAt)
    // localStorage.setItem('access_token', authResult.id);
    // localStorage.setItem('id_token', authResult.userId);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt))
  }

  retrieveAccessToken() {
    // const token = localStorage.getItem('access_token')
    // return token
    return true
  }

  logout() {
    console.log('yes is loggin out')
    localStorage.removeItem('userInfo')
    // Clear access token and ID token from local storage
    // localStorage.removeItem('user_id')
    // localStorage.removeItem('accessKey');
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at')

  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
