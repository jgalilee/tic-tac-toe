import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import T from 'i18n-react';
import Player from './Player';

export default class Score extends Component {
    static propTypes = {
      value: PropTypes.object.isRequired,
    };

    static playerMessage(player, message) {
      return (
        <Fragment>
          <Player value={player} />
          {message}
        </Fragment>
      );
    }

    render() {
      const { value } = this.props;
      if (value.finished()) {
        const winner = value.winner();
        if (winner === undefined) {
          return T.translate('game.draw');
        }
        return Score.playerMessage(winner, T.translate('game.won'));
      }
      return Score.playerMessage(value.player(), T.translate('game.turn'));
    }
}
