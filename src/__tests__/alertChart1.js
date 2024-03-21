/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default
require("whatwg-fetch")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    require(jsPath)
}

beforeEach(function() {
    jest.resetModules()
    jest.restoreAllMocks()
})

test('alert message generated for missing x and y values, but supplied x axis label and y axis label', async function() {

    global.alert = jest.fn();
    initDomFromFiles(`${__dirname}/../scatter/scatter.html`, `${__dirname}/../scatter/scatter.js`);
    const xLabelInput = document.getElementById("x-label-input")
    const yLabelInput = document.getElementById("y-label-input")
    const Generate = document.getElementById("generate-chart-btn")

    await userEvent.type(xLabelInput, "The X Axis")
    await userEvent.type(yLabelInput, "The Y Axis")
    await userEvent.click(Generate)

    expect(global.alert).toHaveBeenCalledWith('Error: No data specified!')

});
