import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CROSS, NOUGHT } from '../players';

export default class Player extends Component {
    static propTypes = {
      value: PropTypes.string,
    };

    static defaultProps = {
      value: '',
    };

    static asSymbol(player) {
      switch (player) {
        case CROSS:
          return '\u274C';
        case NOUGHT:
          return '\u2b58';
        default:
          return '\u00A0';
      }
    }

    static asClass(player) {
      switch (player) {
        case CROSS:
          return 'cross';
        case NOUGHT:
          return 'nought';
        default:
          return undefined;
      }
    }

    render() {
      const { value } = this.props;
      return (
        <span className={Player.asClass(value)}>
          {Player.asSymbol(value)}
        </span>
      );
    }
}
