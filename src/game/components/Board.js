import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range } from '../../util/index';
import Position from './Position';

export default class Board extends Component {
    static propTypes = {
      value: PropTypes.object.isRequired,
    };

    renderRow(row) {
      const { value } = this.props;
      const player = value.player();
      const positions = range(0, 3).map((col) => {
        const link = value.move(player, row, col);
        const occupant = value.playerAt(row, col);
        return <Position key={`row-${row}-col-${col}`} link={link.toString()} occupant={occupant} />;
      });
      return (
        <tr key={`row-${row}`}>
          {positions}
        </tr>
      );
    }

    render() {
      return (
        <table>
          <tbody>
            {range(0, 3).map(row => this.renderRow(row))}
          </tbody>
        </table>
      );
    }
}
