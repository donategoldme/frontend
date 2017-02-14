import React, {PropTypes} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';


// Render your list
export default function listOfDonates(props) {
  const {list, donates, viewedDonate} = props;
  const styles = require('./listOfDonates.scss');
  const handleViewDonate = (id) => () => viewedDonate(id);
  return (
    <div>
      {list.length > 0 ?
      <ListGroup className={styles.listOfDonates}>
        {list.map((id) =>
          <ListGroupItem key={id} header={donates[id].money}>
            {donates[id].nickname} - {donates[id].message}
              <span onClick={handleViewDonate(id)} className="pull-right glyphicon glyphicon-remove" aria-hidden="true"></span>
          </ListGroupItem>
          )}
      </ListGroup>
      :
      <p className={'alert alert-info ' + styles.noDonates}>Ждём поступления</p>
      }
    </div>
  );
}

listOfDonates.propTypes = {
  donates: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  viewedDonate: PropTypes.func.isRequired,
};
