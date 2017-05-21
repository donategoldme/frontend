import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Col} from 'react-bootstrap';


export default class Widgets extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    const styles = require('./Widgets.scss');
    return (
      <div className={styles.widgets}>
        <Helmet title="Widgets"/>
        <Col xs={12} md={12}>
          {this.props.children}
        </Col>
      </div>
    );
  }
}

