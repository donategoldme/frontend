import React, {PropTypes} from 'react';
import {Button, Form} from 'react-bootstrap';
import {FieldGroup, TextAreaGroup} from 'components/Forms/utils';


export class StandardPaypageForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {username: props.username};
    this.saveStandard = this.saveStandard.bind(this);
  }

  saveStandard() {
    return this.props.saveFunc(this.state);
  }
  render() {
    const {minCost, voiceCost, volume} = this.props;
    let moneyHelp = `Минимальный перевод: ${minCost}. Стоимость голосовой озвучки сообщения: ${voiceCost}.`;
    moneyHelp += volume ? ' Голосовое озвучивоние включено' : '';
    return (
        <Form>
          <FieldGroup id="nickname" type="text" label="Имя для показа" placeholder="ИМЯ" onChange={(input) => this.setState({nickname: input.target.value})}/>
          {/* header prefs*/}
          <TextAreaGroup id="message" label="Сообщение" placeholder="Сообщение будет показано на экране" onChange={(input) => this.setState({message: input.target.value})}/>
          <FieldGroup id="money" type="number" label="Сумма" placeholder="Сумма"
           onChange={(input) => this.setState({money: +input.target.value})}
           help={moneyHelp}/>
          <Button style={{backgroundColor: this.props.buttonColor}} onClick={this.saveStandard}>{this.props.buttonText ? this.props.buttonText : 'Save'}</Button>
        </Form>
    );
  }
}

StandardPaypageForm.propTypes = {
  username: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  minCost: PropTypes.number.isRequired,
  voiceCost: PropTypes.number.isRequired,
  volume: PropTypes.bool,
  saveFunc: PropTypes.func.isRequired,
};
