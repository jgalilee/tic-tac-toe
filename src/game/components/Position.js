import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../router/index';
import Player from './Player';

export default class Position extends Component {
    static propTypes = {
      link: PropTypes.string,
      occupant: PropTypes.string,
    };

    static defaultProps = {
      link: '',
      occupant: '',
    };

    render() {
      const { link, occupant } = this.props;
      return (
        <td>
          <Link href={link}>
            <Player value={occupant} />
          </Link>
        </td>
      );
    }
}
