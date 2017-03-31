import React, {Component, PropTypes} from 'react';
import {FormGroup, Button, ControlLabel, FormControl, Form,
   InputGroup} from 'react-bootstrap';


class AnswerForm extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onDel: PropTypes.func.isRequired,
  }

  render() {
    console.log('render');
    return (
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>{this.props.index + 1}</InputGroup.Addon>
          <FormControl placeholder="Вариант" onChange={this.props.onChange} value={this.props.answer}/>
          <InputGroup.Button onClick={this.props.onDel}>
            <Button>удалить</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

class PollForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      answers: []
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onDel = this.onDel.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeQuestion(event) {
    this.setState({question: event.target.value});
  }

  onChange(index) {
    return (event) => {
      const {answers} = this.state;
      answers[index] = event.target.value;
      this.setState({
        answers: answers
      });
    };
  }

  onDel(index) {
    return () => {
      console.log(index);
      const answers = [...this.state.answers];
      answers.splice(index, 1);
      this.setState({
        answers: answers
      });
    };
  }

  onSubmit(event) {
    const {question} = this.state;
    const answers = [];
    for (let index = 0; index < this.state.answers.length; index++) {
      if (this.state.answers[index] !== '') {
        answers.push(this.state.answers[index]);
      }
    }
    this.props.onSubmit({question, answers});
    event.preventDefault();
  }

  addAnswer() {
    const {answers} = this.state;
    answers.push('');
    this.setState({answers: answers});
  }

  render() {
    const { answers } = this.state;
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <ControlLabel>Вопрос</ControlLabel>
            <FormControl placeholder="Вопрос" onChange={this.onChangeQuestion}/>
          </FormGroup>
          <div>
          {answers.map((answer, index) =>
            <AnswerForm
              key={index}
              index={index}
              answer={answer}
              onChange={this.onChange(index)}
              onDel={this.onDel(index)}/>
          )}
          </div>
          <div>
            <Button onClick={this.addAnswer}>Добавить ответ</Button>
          </div>
          <input type="submit" value="Submit" />
        </Form>
      </div>
    );
  }
}

export default PollForm;
