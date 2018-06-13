import React, { Component } from 'react';
import PropTypes from 'prop-types';
import push from './push';

export default class Link extends Component {
    static propTypes = {
      href: PropTypes.string,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
    };

    static defaultProps = {
      href: '',
      children: null,
    };

    render() {
      const { children, href, ...props } = this.props;
      return (
        <a href={href} onClick={push(href)} {...props}>
          {children}
        </a>
      );
    }
}
