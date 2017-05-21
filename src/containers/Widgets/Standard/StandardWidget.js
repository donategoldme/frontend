import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import {Row, Col} from 'react-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';


export default class StandardWidget extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    // const styles = require('./Widgets.scss');
    return (
      <Row>
        <Nav bsStyle="pills" stacked activeKey={1} className={'col-md-2'}>
          <LinkContainer to="/widgets/standard/prefs">
            <NavItem>Настройки</NavItem>
          </LinkContainer>
          <LinkContainer to="/widgets/standard/paypage">
            <NavItem>Страница оплаты</NavItem>
          </LinkContainer>
        </Nav>
        <Helmet title="Чаты"/>
        <Col xs={10} md={10}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

