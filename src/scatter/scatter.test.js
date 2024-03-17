/**
 * @jest-environment jsdom
 */

const chartStorage = require('../lib/chartStorage.js');
const fs = require('fs');
const domTesting = require('@testing-library/dom');

require('@testing-library/jest-dom');
const userEvent = require('@testing-library/user-event').default;

function initDomFromFiles(htmlPath, jsPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  document.open();
  document.write(html);
  document.close();
  require(jsPath);
}
/* Write one or more integration
tests to verify that the “add values” button (i.e. the “+” button) in the sidebar of the
chart builder behaves correctly. Each time the user clicks this button, it should
add a new pair of input fields for the user to enter new X and Y values. Clicking
the button should not impact any data the user has already entered.*/

describe('Test for adding values', function () {
  beforeEach(function () {
    jest.resetModules();
  });
  test('A new pair of input fields for the user is added everytime the user clicks + button', async function () {
    initDomFromFiles(`${__dirname}/scatter.html`, `${__dirname}/scatter.js`);
    const addButton = domTesting.getByText(document, '+');
    const user = userEvent.setup();
    for (let i = 0; i < 3; ++i) {
      const prevNumsXFields = domTesting.queryAllByLabelText(document, 'X', {
        exact: true,
      }).length;
      const prevNumsYFields = domTesting.queryAllByLabelText(document, 'Y', {
        exact: true,
      }).length;

      expect(prevNumsXFields).toEqual(prevNumsYFields);
      await user.click(addButton);
      const allYFields = domTesting.queryAllByLabelText(document, 'Y', {
        exact: true,
      });
      const allXFields = domTesting.queryAllByLabelText(document, 'X', {
        exact: true,
      });

      expect(allYFields).toHaveLength(prevNumsYFields + 1);
      expect(allXFields).toHaveLength(prevNumsXFields + 1);
    }
  });
  beforeEach(function () {
    jest.resetModules();
  });

  test('clicking the + button doesn`t impact the old data', async function () {
    initDomFromFiles(`${__dirname}/scatter.html`, `${__dirname}/scatter.js`);
    const user = userEvent.setup();
    const addButton = domTesting.getByText(document, '+');
    const [X, Y] = [10, 9];
    const prevXFields = domTesting.getByLabelText(document, 'X', {
      exact: true,
      selector: 'input',
    });
    const prevYFields = domTesting.getByLabelText(document, 'Y', {
      exact: true,
      selector: 'input',
    });

    await user.type(prevXFields, JSON.stringify(X));
    await user.type(prevYFields, JSON.stringify(Y));
    await user.click(addButton);
    expect(
      domTesting.getAllByLabelText(document, 'X', {
        exact: true,
        selector: 'input',
      })[0]
    ).toHaveValue(X);
    expect(
      domTesting.queryAllByLabelText(document, 'Y', {
        exact: true,
        selector: 'input',
      })[0]
    ).toHaveValue(Y);
  });
  beforeEach(function () {
    jest.resetModules();
    chartStorage.updateCurrentChartData({});
  });
  test('generate chart image correctly', async function () {
    initDomFromFiles(`${__dirname}/scatter.html`, `${__dirname}/scatter.js`);

    const user = userEvent.setup();
    jest.mock('../lib/generateChartImg.js');
    const generateChartImgSpy = require('../lib/generateChartImg.js');

    const input = {
      title: 'Scatter',
      data: [{ x: 0, y: 0 }],
      xLabel: 'X',
      type: 'scatter',
      yLabel: 'Y',
    };

    const title = domTesting.getByLabelText(document, 'Chart title');
    const xField = domTesting.getByLabelText(document, 'X', {
      exact: true,
    });
    const yField = domTesting.getByLabelText(document, 'Y', {
      exact: true,
    });
    const xLabel = domTesting.getByLabelText(document, 'X label', {
      exact: true,
    });
    const yLabel = domTesting.getByLabelText(document, 'Y label', {
      exact: true,
    });
    const genBtn = domTesting.getByText(document, 'Generate chart');

    await user.type(title, input.title);
    await user.type(xLabel, input.xLabel);
    await user.type(yLabel, input.yLabel);
    await user.type(xField, JSON.stringify(input.data[0].x));
    await user.type(yField, JSON.stringify(input.data[0].y));
    await user.click(genBtn);
    expect(generateChartImgSpy).toHaveBeenCalled();
    generateChartImgSpy.mockRestore();
  });
});
