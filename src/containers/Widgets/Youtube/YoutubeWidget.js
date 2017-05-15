import React, {Component, PropTypes} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';


export default class YoutubedWidget extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    // const styles = require('./Widgets.scss');
    return (
      <div>
        <Nav bsStyle="pills" stacked activeKey={1} className={'col-md-2'}>
          <LinkContainer to="/widgets/youtube/prefs">
            <NavItem>Настройки</NavItem>
          </LinkContainer>
          <LinkContainer to="/widgets/youtube/paypage">
            <NavItem>Страница оплаты</NavItem>
          </LinkContainer>
        </Nav>
        <div className={'col-md-10'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

