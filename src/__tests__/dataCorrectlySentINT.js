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

beforeEach(function() {
    jest.resetModules()
    jest.restoreAllMocks()
})


test("Test", async function() {
    initDomFromFiles(`${__dirname}/../scatter/scatter.html`, `${__dirname}/../scatter/scatter.js`)
        
    const titleInput = domTesting.getByTestId(document, "chart-title-input")
    const xLabelInput = domTesting.getByTestId(document,"x-label-input")
    const yLabelInput = domTesting.getByTestId(document,"y-label-input")
    const xVals = document.getElementsByClassName("x-value-input")
    const yVals = document.getElementsByClassName("y-value-input")
    const addButton = document.getElementById("add-values-btn")
    const chartImg = document.getElementById("chart-img")
    const clearButton = document.getElementById("clear-chart-btn")
    const color = domTesting.getByTestId(document, "color")
    const generate = domTesting.getByTestId(document, "generate-chart-btn")


    jest.mock("../lib/generateChartImg.js")
    const generateChartImgStub = require("../lib/generateChartImg")
    generateChartImgStub.mockImplementation(function() {
        return "http://placekitten.com/480/480"
    })

    await userEvent.type(titleInput, "A Good Chart Title")
    await userEvent.type(xLabelInput, "The X Axis")
    await userEvent.type(yLabelInput, "The Y Axis")
    await userEvent.type(xVals[0], "5")
    await userEvent.type(yVals[0], "5")
    await userEvent.type(color,"#ff1111")

    await userEvent.click(generate)


    expect(generateChartImgStub).toHaveBeenCalled()
    generateChartImgStub.mockRestore()
})

