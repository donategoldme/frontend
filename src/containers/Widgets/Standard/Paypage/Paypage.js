import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { Link } from 'react-router';
import {Well, Row, Col, Button} from 'react-bootstrap';

import {PaypageForm} from 'components/Forms/StandardWF/Paypage';
import {activingTab, saveFuncActive as sfa} from 'redux/modules/uploader';
import {isLoaded, loadPaypages} from 'redux/modules/widgets/standard/paypage';
import * as widgetActions from 'redux/modules/widgets/standard/paypage';

const styles = require('./paypages.scss');

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(loadPaypages()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    paypages: state.standardWidget.paypages.paypages,
    results: state.standardWidget.paypages.results,
    uploaderForm: state.standardWidget.paypages.uploaderForm,
    openForm: state.standardWidget.paypages.openForm,
    error: state.standardWidget.paypages.error,
    user: state.auth.user,
  }),
  {...widgetActions, activingTab, saveFuncActive: sfa})
export default class StandardPaypage extends Component {
  static propTypes = {
    paypages: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
    uploaderForm: PropTypes.bool.isRequired,
    openForm: PropTypes.bool.isRequired,
    saveFuncActive: PropTypes.func.isRequired,
    savePaypage: PropTypes.func.isRequired,
    activatePaypage: PropTypes.func.isRequired,
    editPaypage: PropTypes.func.isRequired,
    uploaderFormMng: PropTypes.func.isRequired,
    openFormMng: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  };
  render() {
    // const styles = require('./Widgets.scss');
    const {saveFuncActive, savePaypage, paypages, results, user, uploaderForm, uploaderFormMng,
    openForm, openFormMng, error} = this.props;
    const editPaypage = (id) => {
      return () => this.props.editPaypage(id);
    };
    const activatePaypage = (paypage) => {
      return () => this.props.activatePaypage(paypage);
    };
    const saveNewPaypage = (paypage) => {
      savePaypage(paypage);
      openFormMng();
    };
    return (
      <div>
        <Helmet title="Страница оплаты"/>
        <Link to={'/s/' + this.props.user.username} target="_blank">Открыть страницу доната</Link>
        <Link to={'/s/' + this.props.user.username}>Открыть страницу доната</Link>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>
        }
        <Row>
          <Col md={12} xs={12}>
            {openForm ? <PaypageForm paypage={{}} savePaypage={saveNewPaypage}
                saveFuncActive={saveFuncActive} activingTab={activingTab} userId={user.id}
                uploaderForm={uploaderForm} uploaderFormMng={uploaderFormMng} cancel={openFormMng}/>
              :
            <Button onClick={openFormMng}>Новая надстройка</Button>
          }
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            {
              results.map((id) =>
              <Well key={id} className={paypages[id].active ? styles.active : 'nope'}>
                {paypages[id].edit
                ?
                  <PaypageForm paypage={paypages[id]} savePaypage={savePaypage}
                  saveFuncActive={saveFuncActive} activingTab={activingTab} userId={user.id}
                  uploaderForm={uploaderForm} uploaderFormMng={uploaderFormMng} cancel={editPaypage(id)}/>
                :
                <Row>
                  <div>{paypages[id].name}</div>
                  <Button onClick={editPaypage(id)}>Редактировать</Button>
                  <Button onClick={activatePaypage(paypages[id])}>Активировать</Button>
                </Row>
                }
              </Well>
              )
            }
          </Col>
        </Row>
      </div>
    );
  }
}

