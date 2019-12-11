const initialState = {
  web3Instance: null,
  portis: null,
  web3Portis: null,
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED')
  {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance,
      portis: action.payload.portis,
      web3Portis: action.payload.web3Portis
    })
  }

  return state
}

export default web3Reducer
