import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './history';

export default class Router extends Component {
    static propTypes = {
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
    };

    static defaultProps = {
      children: null,
    };

    static gameFromLocation() {
      const { location: { pathname } } = window;
      return pathname.substring(1);
    }

    constructor(props) {
      super(props);
      this.state = {
        value: Router.gameFromLocation(),
      };
    }

    onLocationChange() {
      this.setState({
        value: Router.gameFromLocation(),
      });
    }

    componentDidMount() {
      const handle = (event) => {
        if (typeof event.preventDefault === 'function') {
          event.preventDefault();
        }
        this.onLocationChange();
      };
      window.onpopstate = handle;
      window.onpushstate = handle;
      this.onLocationChange();
    }

    componentWillUnmount() {
      window.onpopstate = null;
      window.onpushstate = null;
    }

    render() {
      const { children } = this.props;
      const { value } = this.state;
      const injectValue = child => React.cloneElement(child, { value });
      const childrenWithValue = React.Children.map(children, injectValue, {});
      return (
        <Fragment>
          {childrenWithValue}
        </Fragment>
      );
    }
}
