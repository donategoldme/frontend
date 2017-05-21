import React, {PureComponent} from 'react';
import {Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';
// import {connect} from 'react-redux';
import {getDonatePagePref, createStandardDonate} from 'redux/modules/donatepage/standard';
import {StandardPaypageForm} from 'components/Forms/DonateWF/StandardPaypage';
import {YandexForm} from 'components/Forms/DonateWF/YandexForm';

const styles = require('./donatepage.scss');

const unknownError = 'Неизвестная ошибка. Попробуйте обновить страницу или попробовать позже';

function toColor(colorstr, defCol) {
  let color;
  if (colorstr) {
    const parsing = JSON.parse(colorstr || '{"r": 0, "g": 0, "b": 0, "a": 1}');
    return `rgba(${parsing.r},${parsing.g},${parsing.b},${parsing.a})`;
  } else if (defCol) {
    color = defCol;
  } else {
    color = '#fff';
  }
  return color;
}

function toImgPath(img, userID) {
  return img && userID ? `url("/uploads/${userID}/pic/${img}")` : ``;
}

function isValidURL(str) {
  if (__SERVER__) {
    return true;
  }
  const anchor = document.createElement('a');
  anchor.href = str;
  return (anchor.host && anchor.host !== window.location.host);
}

function toLinks(linksStr) {
  if (!linksStr) {
    return [];
  }
  return linksStr.split(';').filter(isValidURL);
}

function importFonts(header, main) {
  const fonts = [];
  if (header) {
    fonts.push(header);
  }
  if (main) {
    fonts.push(main);
  }
  return fonts;
}

function ImportFonts({fonts}) {
  return (
    <div>
    {fonts.map((font, index) =>
      <link key={index} href={'https://fonts.googleapis.com/css?family=' + font.replace(' ', '+')} rel="stylesheet"/>
      )}
    </div>
  );
}


export default class StandardDonatePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {pref: {paypage: {}}};
    this.createDonate = this.createDonate.bind(this);
  }
  componentDidMount() {
    getDonatePagePref(this.props.routeParams.username).end((err, res) => {
      if (err !== null) {
        if (res && res.statusCode === 404) {
          this.setState({error: res.text});
          return;
        }
        this.setState({error: unknownError});
        return;
      }
      this.setState({pref: {...res.body}});
    });
  }
  createDonate(donate) {
    return createStandardDonate(donate).end((err, res) => {
      if (err !== null) {
        if (res && res.statusCode === 400) {
          this.setState({error: res.text});
          return;
        }
        this.setState({error: unknownError});
        return;
      }
      this.setState({data: {...res.body}});
    });
  }
  render() {
    const {pref} = this.state;
    const headerImg = toImgPath(pref.paypage.header_img, pref.paypage.user_id);
    const bgImg = toImgPath(pref.paypage.background_img, pref.paypage.user_id);
    const links = toLinks(pref.paypage.header_chans);
    const headerPref = {fontFamily: pref.paypage.header_font, backgroundColor: toColor(pref.paypage.header_color, '#fff'), backgroundImage: headerImg, color: toColor(pref.paypage.header_text_color, '#000')};
    return (
      <Row>
      <ImportFonts fonts={importFonts(pref.paypage.header_font, pref.paypage.main_font)} />
      <Col xs={12} md={12} className={styles.containerDonatePage + ' ' + styles.imgContainer} style={{height: '100%', backgroundColor: toColor(pref.paypage.background_color, '#fff'), backgroundImage: bgImg, position: 'fixed'}}>
        <Helmet title={'Донат для ' + this.props.routeParams.username}/>
        <Row style={{height: '100%'}}>
          <Col xs={12} md={6} className={styles.toCenter}>
          <Row className={styles.header + ' ' + styles.imgContainer} style={headerPref}>
            <div className={styles.bottomed}>
              <Col xs={12} md={12} className={styles.headerChans}>
                {links.map((link, index) =>
                  <p key={index}><a style={{color: headerPref.color}} href={link} target="_blank">{link}</a></p>
                )}
              </Col>
              <Col xs={12} md={12} className={styles.headerTitle}>
                { pref.paypage.header_title &&
                  <h3>{pref.paypage.header_title}</h3>
                }
                {pref.paypage.header_desc && <p>{pref.paypage.header_desc}</p>}
              </Col>
            </div>
          </Row>
          <Row className={styles.mainWind} style={{fontFamily: pref.paypage.main_font}}>
            <Col xs={12} md={12}>
              {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}
              {this.state.data ?
                <YandexForm formcomment={'Донат стримеру ' + this.props.routeParams.username} label={'SD.' + this.state.data.id + '.' + this.state.data.user_id}
                money={this.state.data.money} successURL={window.location + '?' + 'success'} targets={'Стандартный донат стримеру ' + this.props.routeParams.username + ' с id ' + this.state.data.id}/>
                :
                <div>
                  <h3>{pref.paypage.main_title}</h3>
                  <p>{pref.paypage.main_desc}</p>
                  <StandardPaypageForm username={this.props.routeParams.username} saveFunc={this.createDonate}
                  buttonColor={toColor(pref.paypage.button_color, '#fff')} buttonText={pref.paypage.button_text}
                  minCost={pref.cost || 0} voiceCost={pref.voice_cost || 0} volume={pref.volume || false}/>
               </div>
              }
            </Col>
          </Row>
          </Col>
        </Row>
      </Col>
      </Row>
    );
  }
}
