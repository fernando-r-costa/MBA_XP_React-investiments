import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class FundoDeAcoes extends Component {
  constructor(props) {
    super(props);
    // O objeto com os dados do fundo de ações
    this.data = props.data;
    // As cores para o gráfico
    this.colors = ['#FF6384', '#36A2EB', '#FFCE56'];
  }

  // Uma função para formatar os rótulos do eixo horizontal
  formatLabels = (reports) => {
    return reports.map((report) => `${report.month}/${report.year}`);
  };

  // Uma função para formatar os dados do gráfico
  formatData = (reports) => {
    return reports.map((report) => report.value);
  };

  // Uma função para gerar as opções do gráfico
  generateOptions = () => {
    return {
      title: {
        display: true,
        text: 'Fundo de Ações',
        fontSize: 20,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  };

  // Uma função para gerar os dados do gráfico
  generateData = () => {
    return {
      labels: this.formatLabels(this.data.reports),
      datasets: [
        {
          label: 'Valor',
          fill: false,
          lineTension: 0.1,
          backgroundColor: this.colors[0],
          borderColor: this.colors[0],
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: this.colors[0],
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: this.colors[0],
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.formatData(this.data.reports),
        },
      ],
    };
  };

  render() {
    return (
      <div>
        <Line data={this.generateData()} options={this.generateOptions()} />
      </div>
    );
  }
}

export default FundoDeAcoes;
