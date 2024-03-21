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

test('alert message generated for x axis and y axis and x value, but missing y value', async function() {
   
    const theSpy = jest.spyOn(window, "alert")
    initDomFromFiles(`${__dirname}/../scatter/scatter.html`, `${__dirname}/../scatter/scatter.js`)
    const xVals = document.getElementsByClassName("x-value-input")
    const yVals = document.getElementsByClassName("y-value-input")
    const Generate = document.getElementById("generate-chart-btn")
    const xLabelInput = document.getElementById("x-label-input")
    const yLabelInput = document.getElementById("y-label-input")


    await userEvent.type(xLabelInput, "The X Axis")
    await userEvent.type(yLabelInput, "The Y Axis")
    await userEvent.type(xVals[0], "1")

    await userEvent.click(Generate)

    expect(theSpy).not.toHaveBeenCalledWith() //It will fill in 0 for y

})
