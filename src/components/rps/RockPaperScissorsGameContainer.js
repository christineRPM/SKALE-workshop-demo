import { connect } from 'react-redux'
import RockPaperScissorsGame from './RockPaperScissorsGame'
import { registerPlayer, soloPlay, portisPlay, computerPlay, gameReset } from './RockPaperScissorsGameActions'

const mapStateToProps = (state, ownProps) => {
  return {
    winner: state.game.winner,
    showWinner: state.game.displayWinner,
    portis: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterUser: () => {
      dispatch(registerPlayer())
    },
    onPlay: (value, computerChoice) => {
      dispatch(soloPlay(value, computerChoice))
    },
    onPlayPortis: (value, computerChoice) => {
      dispatch(portisPlay(value, computerChoice))
    },
    onPlayTwo: (value, computerChoice, callback) => {
      dispatch(computerPlay(value, computerChoice, callback))
    },
    resetGame: () => {
      dispatch(gameReset())
    }

  }
}

const RockPaperScissorsGameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RockPaperScissorsGame)

export default RockPaperScissorsGameContainer
