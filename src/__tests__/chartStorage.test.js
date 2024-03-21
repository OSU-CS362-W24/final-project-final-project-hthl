const chartStorage = require('../lib/chartStorage');

// mock localStorage
const localStorageMock = (() => {
  let storage = {};

  return {
    getItem: (key) => {
      return storage[key];
    },
    setItem: (key, value) => {
      storage[key] = value.toString();
    },
    clear: () => {
      storage = {};
    }
  };
})();

// setting the window global object so it also effects chartStorage.js
global.window = { localStorage: localStorageMock };

describe('chartStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it('should store a chart', () => {
    const chart = { id: 'chart-1', data: [1, 2, 3] };
    chartStorage.saveChart(chart);

    expect(JSON.parse(window.localStorage.getItem('savedCharts'))).toEqual([chart]);
  });

  it('should retrieve a specific chart', () => {
    const chart1 = { id: 'chart-1', data: [1, 2, 3] };
    const chart2 = { id: 'chart-2', data: [4, 5, 6] };
    chartStorage.saveChart(chart1);
    chartStorage.saveChart(chart2);

    expect(chartStorage.loadSavedChart(1)).toEqual(chart2);
  });

  it('should retrieve all charts', () => {
    const chart1 = { id: 'chart-1', data: [1, 2, 3] };
    const chart2 = { id: 'chart-2', data: [4, 5, 6] };
    chartStorage.saveChart(chart1);
    chartStorage.saveChart(chart2);

    expect(chartStorage.loadAllSavedCharts()).toEqual([chart1, chart2]);
  });
  
  it('should update the current chart data', () => {
    const chart = { id: 'chart-1', data: [1, 2, 3] };
    chartStorage.updateCurrentChartData(chart);

    expect(JSON.parse(window.localStorage.getItem('currentChartData'))).toEqual(chart);
  });
  
  it('should retrieve the current chart data', () => {
    const chart = { id: 'chart-1', data: [1, 2, 3] };
    chartStorage.updateCurrentChartData(chart);

    expect(chartStorage.loadCurrentChartData()).toEqual(chart);
  });
});