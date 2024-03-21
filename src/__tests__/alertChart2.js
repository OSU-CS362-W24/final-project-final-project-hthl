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

test('alert message generated for missing x axis label and y axis label, but supplied x and y values', async function() {
   
    global.alert = jest.fn();
    initDomFromFiles(`${__dirname}/../scatter/scatter.html`, `${__dirname}/../scatter/scatter.js`)
    const xVals = document.getElementsByClassName("x-value-input")
    const yVals = document.getElementsByClassName("y-value-input")
    const Generate = document.getElementById("generate-chart-btn")

    await userEvent.type(xVals[0], "1")
    await userEvent.type(yVals[0], "2")

    await userEvent.click(Generate)

    expect(global.alert).toHaveBeenCalledWith('Error: Must specify a label for both X and Y!');

})

