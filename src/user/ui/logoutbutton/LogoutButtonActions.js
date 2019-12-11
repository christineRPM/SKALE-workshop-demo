import { browserHistory } from 'react-router'
import store from '../../../store'

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  }
}

export function logoutUser() {
  let {portis} = store.getState().web3;
  return function(dispatch) {
    portis.onLogout(() => {
      console.log('User logged out');
    });
    // Logout user.
      dispatch(userLoggedOut())

      // Redirect home.
      return browserHistory.push('/')
  }
}
