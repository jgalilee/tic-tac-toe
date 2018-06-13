import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import Score from './Score';
import gameFromString, { NEW_GAME } from '../gameFromString';
import Reset from './Reset';

export default class Game extends Component {
    static propTypes = {
      value: PropTypes.string,
    };

    static defaultProps = {
      value: NEW_GAME,
    };

    render() {
      const { value } = this.props;
      const game = gameFromString(value);
      return (
        <Fragment>
          <section>
            <Reset hidden={!game.finished()} />
            <Board value={game} />
          </section>
          <footer>
            <Score value={game} />
          </footer>
        </Fragment>
      );
    }
}
