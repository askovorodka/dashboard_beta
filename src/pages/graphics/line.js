import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

class Line extends React.Component {

  constructor () {
    super()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!moment(nextProps.date.startDate).isSame(this.props.date.startDate)
      || !moment(nextProps.date.finishDate).isSame(this.props.date.finishDate)
      || nextProps.graphics.group_by !== this.props.graphics.group_by
      || nextProps.graphics.currency !== this.props.graphics.currency) {
      this.props.actions.getGraphData(nextProps.token, this.dateFor(nextProps.date), nextProps.graphics.group_by, nextProps.graphics.currency)
    }

    return (nextProps.graphics.data !== this.props.graphics.data
    ) ? true : false
  }

  render () {
    return (
      <div className="graph_body">
        <canvas ref={'chart'} height={'200'} width={'1000'}></canvas>
      </div>
    )
  }

  dateFor (date) {
    return {
      date_from: date.startDate.format(),
      date_to: date.finishDate.format()
    }
  }

  componentDidMount () {
    this.props.actions.getGraphData(this.props.token, this.dateFor(this.props.date), this.props.graphics.group_by, this.props.graphics.currency)
  }

  componentDidUpdate () {

    const gr = this.props.graphics

    if (gr.ready && Object.keys(gr.chart).length == 0) {

      import('chart.js').then(Chart => {

        let chartCanvas = this.refs.chart

        let myChart = new Chart(chartCanvas, {
          type: 'line',
          data: gr.data,
          options: {
            defaultFontColor: '#717585',
            defaultFontFamily: 'Arial',
            defaultFontSize: 11,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [{
                id: 'A',
                type: 'linear',
                position: 'left',
              }, {
                id: 'B',
                type: 'linear',
                position: 'right',
                ticks: {
                  callback: function(value, index, values) {
                    if (Math.floor(value) === value) {
                      return value;
                    }
                  }
                }
              }]
            }
          }
        })

        this.props.actions.changeGraphData(myChart)

      }).catch(err => {
        console.log('Failed to load CHART', err)
      })

    }

    if (gr.ready && Object.keys(gr.chart).length != 0) {
      let chart = this.props.graphics.chart
      let data = gr.data

      data.datasets.forEach((dataset, i) => chart.data.datasets[i].data = dataset.data)

      chart.data.labels = data.labels
      chart.update()
      this.props.actions.changeGraphData(chart)
    }

  }

}

export default connect(
  state => ({
    graphics: state.graphics,
    date: state.date,
  }),
  dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
  })
)(Line)