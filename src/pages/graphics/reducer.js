const initialState = {
  currency: 'RUB', // USD
  isLoading: true,
  ready: false,
  group_by: 'day',
  chart: {},
  data: {
    labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август"],
    datasets: [
      {
        label: "Доход",
        yAxisID: 'A',
        fill: false,
        borderColor: '#387eff',
        pointBackgroundColor: '#387eff',
        data: [32, 90, 5, 12, 75, 12, 2]
      },
      {
        label: "Прибыль",
        yAxisID: 'A',
        fill: false,
        borderColor: '#40e7ed',
        pointBackgroundColor: '#40e7ed',
        data: [15, 30, 95, 40, 20, 12, 80]
      },
      {
        label: "Убыль",
        yAxisID: 'A',
        fill: false,
        borderColor: '#eb0954',
        pointBackgroundColor: '#eb0954',
        data: [46, 30, 95, 45, 100, 12, 40]
      }
    ]
  }
}

const datasets = [
  {
    label: "income",
    yAxisID: 'A',
    fill: false,
    borderColor: '#387eff',
    pointBackgroundColor: '#387eff',
    data: []
  },
  {
    label: "average_check",
    yAxisID: 'A',
    fill: false,
    borderColor: '#40e7ed',
    pointBackgroundColor: '#40e7ed',
    data: []
  },
  {
    label: "unique_users",
    yAxisID: 'B',
    fill: false,
    borderColor: '#eb0954',
    pointBackgroundColor: '#eb0954',
    data: []
  },
] 


const graphicsReducer = function (state = initialState, action) {

  switch (action.type) {
    case 'GET_GRAPHDATA_PENDING':
      return Object.assign({}, state, {isLoading: true, ready: false, data: {labels: [], datasets: []}})
    case 'GET_GRAPHDATA_FULFILLED':

      let labels = []

      const newData = action.payload.result.map((it, ind) => {
        labels[ind] = moment(it.date).format("DD.MM.YYYY")
        datasets[0].data[ind] = parseInt(it.sum_value)
        datasets[1].data[ind] = parseInt(it.average_check)
        datasets[2].data[ind] = parseInt(it.unique_users)
      })
      return Object.assign({}, state, {isLoading: false, ready: true, items: action.payload.result, data: {labels: labels, datasets: datasets}})

    case 'GET_GRAPHDATA_REJECTED':
      return Object.assign({}, state, {isLoading: false, items: initialState.items})

    case 'CHANGE_CHART':
      return Object.assign({}, state, {isLoading: false, chart: action.payload})

    case 'CHANGE_PERIOD':
      return Object.assign({}, state, {group_by: action.payload})

    case 'CHANGE_CURRENCY':
      return Object.assign({}, state, {currency: action.payload})

    case 'DEL_GRAPHDATA':
      return Object.assign({}, state, {isLoading: false, ready: false, items: [], data: [], chart: {}})

  }

  return state
}

export default graphicsReducer