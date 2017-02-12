import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';


export default class Widgets extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    const styles = require('./Widgets.scss');
    return (
      <div className={styles.widgets}>
        <Nav bsStyle="pills" stacked activeKey={1} className={'col-md-2'}>
          <LinkContainer to="/widgets/youtube">
            <NavItem>YoutubeDJ</NavItem>
          </LinkContainer>
          <LinkContainer to="/widgets/standard">
            <NavItem>Donates</NavItem>
          </LinkContainer>
        </Nav>
        <Helmet title="Widgets"/>
        <div className={styles.appContent + ' col-md-10'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

