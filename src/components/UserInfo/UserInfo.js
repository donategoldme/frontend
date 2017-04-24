import React, {PropTypes} from 'react';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';


const UserInfo = props => {
  return (
    <div>
      {props.user &&
      <p className={'navbar-text'}><strong>{props.user.username}</strong>({props.balance.money})</p>}
      {
        // <Nav navbar pullRight>
          // <NavItem eventKey={1} target="_blank" title="View on Github" href="https://github.com/erikras/react-redux-universal-hot-example">
            // <i className="fa fa-github"/>
          // </NavItem>
        // </Nav>
      }
    </div>
    );
};

UserInfo.propTypes = {
  user: PropTypes.object,
  balance: PropTypes.object.isRequired,
};

export default UserInfo;
