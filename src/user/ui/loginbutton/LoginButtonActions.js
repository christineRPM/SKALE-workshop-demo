import { browserHistory } from 'react-router'
import store from '../../../store'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  let {portis} = store.getState().web3;
  return function(dispatch) {
    portis.onLogin((walletAddress, email) => {
      browserHistory.push('/demo');
      return dispatch(userLoggedIn({walletAddress: walletAddress}));
    });
    portis.showPortis();
  }
}