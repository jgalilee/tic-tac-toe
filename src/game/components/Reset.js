import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../../router/Link';
import { NEW_GAME } from '../gameFromString';

export default class Reset extends Component {
    static propTypes = {
      hidden: PropTypes.bool,
    };

    static defaultProps = {
      hidden: false,
    };

    render() {
      const { hidden } = this.props;
      if (hidden === true) {
        return null;
      }
      return (
        <aside>
          <Link href={`/${NEW_GAME}`}>
            {'\u27F2'}
          </Link>
        </aside>
      );
    }
}
