import React, {Component, PropTypes} from 'react';
// import {Doughnut} from 'react-chartjs-2';
let chart; // на сервере просит window. Рендерится только на клиенте.
if (__CLIENT__) {
  chart = require('react-chartjs-2');
}

const colors = ['#f9bc02', '#fd5308', '#a7194b', '#3e01a4', '#0392ce',
 '#65af32', '#fb9902', '#fe2712', '#fffe34', '#8601b0'];

function generateData(poll) {
  const labels = [];
  const cols = [];
  const counts = [];
  if (!!poll.answers) {
    poll.answers.forEach((answer, index) => {
      cols.push(colors[index]);
      labels.push(answer.text);
      counts.push(answer.count);
    });
  }
  return {labels: labels, datasets: [{data: counts, backgroundColor: cols}]};
}

export default class VoteChart extends Component {
  static propTypes = {
    poll: PropTypes.object.isRequired,
  }
  render() {
    const Doughnut = chart.Doughnut;
    const data = generateData(this.props.poll);
    return (
      <div>
        <h2>{this.props.poll.question}</h2>
        <div>Количество проголосовавших: <span>{this.props.poll.count}</span></div>
        <Doughnut data={data} />
      </div>
    );
  }
}
