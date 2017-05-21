import React, {PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';


export class YandexForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveStandard() {
    return this.props.saveFunc(this.state);
  }
  render() {
    const {formcomment, label, targets, money, comment, successURL} = this.props;
    return (
        <form ref={this.ff} method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">
          <input type="hidden" name="receiver" value="41001769931834"/>
          <input type="hidden" name="formcomment" value={formcomment}/>
          <input type="hidden" name="short-dest" value={formcomment}/>
          <input type="hidden" name="label" value={label}/>
          <input type="hidden" name="quickpay-form" value="donate"/>
          <input type="hidden" name="targets" value={targets}/>
          <input type="hidden" name="sum" value={money} data-type="number"/>
          {comment && <input type="hidden" name="comment" value={comment}/>}
          {successURL && <input type="hidden" name="successURL" value={successURL}/>}
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Чем оплатить?</ControlLabel>
            <FormControl componentClass="select" placeholder="select" name="paymentType">
              <option value="PC">Яндекс.Деньгами</option>
              <option value="AC">Банковской картой</option>
              <option value="MC">С мобильного</option>
            </FormControl>
          </FormGroup>
          <Button type="submit">Оплатить</Button>
      </form>
    );
  }
}

YandexForm.propTypes = {
  // username: PropTypes.string.isRequired,
  formcomment: PropTypes.string,
  label: PropTypes.string.isRequired,
  targets: PropTypes.string.isRequired,
  money: PropTypes.number.isRequired,
  comment: PropTypes.string,
  successURL: PropTypes.string,
};
