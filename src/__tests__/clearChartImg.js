

/**
 * @jest-environment jsdom
 */

const generate = require('../lib/generateChartImg')
const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default


function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	jest.isolateModules(function() {
		require(jsPath)
	})}


    test('scatter chart generated and cleared for one x value and one y value',async function(){
        initDomFromFiles(`${__dirname}/../scatter/scatter.html`, `${__dirname}/../scatter/scatter.js`)
        
        const titleInput = document.getElementById("chart-title-input")
        const xLabelInput = document.getElementById("x-label-input")
        const yLabelInput = document.getElementById("y-label-input")
        const xVals = document.getElementsByClassName("x-value-input")
        const yVals = document.getElementsByClassName("y-value-input")
        const addButton = document.getElementById("add-values-btn")
        const chartImg = document.getElementById("chart-img")
        const clearButton = document.getElementById("clear-chart-btn")

        await userEvent.type(titleInput, "A Good Chart Title")
        await userEvent.type(xLabelInput, "The X Axis")
        await userEvent.type(yLabelInput, "The Y Axis")
        await userEvent.type(xVals[0], "5")
        await userEvent.type(yVals[0], "5")

        expect(chartImg).toBeDefined() //checking that the chart exists

        await userEvent.click(clearButton)

        expect(chartImg).toBe(null)  //checking that the chart clears

        //checking that all input fields are empty
        expect(xVals[0].textContent).toBe("")
        expect(yVals[0].textContent).toBe("") 

        expect(xLabelInput.textContent).toBe("") 
        expect(yLabelInput.textContent).toBe("") 

        expect(titleInput.textContent).toBe("")
      })

    test('scatter chart generated and cleared for two x values and y values',async function(){
        initDomFromFiles(`${__dirname}/../scatter/scatter.html`, `${__dirname}/../scatter/scatter.js`)
        
        const titleInput = document.getElementById("chart-title-input")
        const xLabelInput = document.getElementById("x-label-input")
        const yLabelInput = document.getElementById("y-label-input")
        const xVals = document.getElementsByClassName("x-value-input")
        const yVals = document.getElementsByClassName("y-value-input")
        const addButton = document.getElementById("add-values-btn")
        const chartImg = document.getElementById("chart-img")
        const clearButton = document.getElementById("clear-chart-btn")

        await userEvent.type(titleInput, "A Good Chart Title")
        await userEvent.type(xLabelInput, "The X Axis")
        await userEvent.type(yLabelInput, "The Y Axis")
        await userEvent.type(xVals[0], "5")
        await userEvent.type(yVals[0], "5")
        
        await userEvent.click(addButton)

        await userEvent.type(xVals[1], "4")
        await userEvent.type(yVals[1], "4")
        
        expect(xVals.length).toBe(2) //checking that there are 2 x values
        expect(yVals.length).toBe(2) //checking that there are 2 y values

        expect(chartImg).toBeDefined() //checking that the chart exists

        await userEvent.click(clearButton)

        expect(chartImg).toBe(null)  //checking that the chart clears

        //Reset the page to display just one pair of input fields for entering X and Y values (their lengths are each 1).
        expect(xVals.length).toBe(1)
        expect(yVals.length).toBe(1)

        //checking that all input fields are empty
        expect(xVals[0].textContent).toBe("")
        expect(yVals[0].textContent).toBe("") 

        expect(xLabelInput.textContent).toBe("") 
        expect(yLabelInput.textContent).toBe("") 

        expect(titleInput.textContent).toBe("")
      })


      test('scatter chart generated and cleared for severl x values and y values',async function(){
        initDomFromFiles(`${__dirname}/../scatter/scatter.html`, `${__dirname}/../scatter/scatter.js`)
        
        const titleInput = document.getElementById("chart-title-input")
        const xLabelInput = document.getElementById("x-label-input")
        const yLabelInput = document.getElementById("y-label-input")
        const xVals = document.getElementsByClassName("x-value-input")
        const yVals = document.getElementsByClassName("y-value-input")
        const addButton = document.getElementById("add-values-btn")
        const chartImg = document.getElementById("chart-img")
        const clearButton = document.getElementById("clear-chart-btn")

        await userEvent.type(titleInput, "A Good Chart Title")
        await userEvent.type(xLabelInput, "The X Axis")
        await userEvent.type(yLabelInput, "The Y Axis")
        await userEvent.type(xVals[0], "5")
        await userEvent.type(yVals[0], "5")
        
        await userEvent.click(addButton)

        await userEvent.type(xVals[1], "4")
        await userEvent.type(yVals[1], "4")

        await userEvent.click(addButton)

        await userEvent.type(xVals[2], "3")
        await userEvent.type(yVals[2], "3")

        await userEvent.click(addButton)

        await userEvent.type(xVals[3], "2")
        await userEvent.type(yVals[3], "2")

        await userEvent.click(addButton)

        await userEvent.type(xVals[4], "1")
        await userEvent.type(yVals[4], "1")

        await userEvent.click(addButton)

        await userEvent.type(xVals[5], "0")
        await userEvent.type(yVals[5], "0")
        
        expect(xVals.length).toBe(6) //checking that there are 2 x values
        expect(yVals.length).toBe(6) //checking that there are 2 y values

        expect(chartImg).toBeDefined() //checking that the chart exists

        await userEvent.click(clearButton)

        expect(chartImg).toBe(null)  //checking that the chart clears

        //Reset the page to display just one pair of input fields for entering X and Y values (their lengths are each 1).
        expect(xVals.length).toBe(1)
        expect(yVals.length).toBe(1)

        //checking that all input fields are empty
        expect(xVals[0].textContent).toBe("")
        expect(yVals[0].textContent).toBe("") 

        expect(xLabelInput.textContent).toBe("") 
        expect(yLabelInput.textContent).toBe("") 

        expect(titleInput.textContent).toBe("")
      })