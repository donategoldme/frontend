import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';


export default class Widgets extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    const styles = require('./Widgets.scss');
    return (
      <div className={styles.widgets}>
        <Helmet title="Widgets"/>
        <div className={styles.appContent + ' col-md-12'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

