

/**
 * @jest-environment jsdom
 */
const generate = require('../lib/generateChartImg')
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
	jest.isolateModules(function() {
		require(jsPath)
	})}


    test('scatter chart generated and cleared for one x value and one y value',async function(){
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

        await userEvent.type(titleInput, "A Good Chart Title") //Setting Title
        await userEvent.type(xLabelInput, "The X Axis") //Setting X axis
        await userEvent.type(yLabelInput, "The Y Axis") //Setting Y axis
        await userEvent.type(xVals[0], "5") //Entering value for X
        await userEvent.type(yVals[0], "5") //Entering value for Y
        await userEvent.type(color,"#ff2211") //Changing color
        
        await userEvent.click(generate)

        expect(chartImg).toBeDefined() //checking that the chart exists

        await userEvent.click(clearButton)

        expect(chartImg).toBe(null)  //checking that the chart clears

        expect(color.value).toBe("#ff4500")  //checking that the color resets

        //checking that all input fields are empty
        expect(xVals[0].textContent).toBe("")
        expect(yVals[0].textContent).toBe("") 

        expect(xLabelInput.textContent).toBe("") 
        expect(yLabelInput.textContent).toBe("") 

        expect(titleInput.textContent).toBe("")
      })

    test('scatter chart generated and cleared for two x values and y values',async function(){
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

        await userEvent.type(titleInput, "A Good Chart Title")
        await userEvent.type(xLabelInput, "The X Axis")
        await userEvent.type(yLabelInput, "The Y Axis")
        await userEvent.type(xVals[0], "5")
        await userEvent.type(yVals[0], "5")
        await userEvent.type(color,"#ff1231")
        
        await userEvent.click(addButton)

        await userEvent.type(xVals[1], "4")
        await userEvent.type(yVals[1], "4")
        
        expect(xVals.length).toBe(2) //checking that there are 2 x values
        expect(yVals.length).toBe(2) //checking that there are 2 y values
        await userEvent.click(generate)

        expect(chartImg).toBeDefined() //checking that the chart exists

        await userEvent.click(clearButton)

        expect(chartImg).toBe(null)  //checking that the chart clears

        expect(color.value).toBe("#ff4500")  //checking that the color resets

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


      test('scatter chart generated and cleared for several x values and y values',async function(){
        initDomFromFiles(`${__dirname}/../scatter/scatter.html`, `${__dirname}/../scatter/scatter.js`)
        
        const titleInput = domTesting.getByTestId(document, "chart-title-input")
        const xLabelInput = domTesting.getByTestId(document,"x-label-input")
        const yLabelInput = domTesting.getByTestId(document,"y-label-input")
        const xVals = document.getElementsByClassName("x-value-input")
        const yVals = document.getElementsByClassName("y-value-input")
        const addButton = domTesting.getByTestId(document, "add-values-btn")
        const chartImg = document.getElementById(document,"chart-img")
        const clearButton = domTesting.getByTestId(document,"clear-chart-btn")
        const color = domTesting.getByTestId(document, "color")
        const generate = domTesting.getByTestId(document, "generate-chart-btn")

        await userEvent.type(titleInput, "A Good Chart Title")
        await userEvent.type(xLabelInput, "The X Axis")
        await userEvent.type(yLabelInput, "The Y Axis")
        await userEvent.type(xVals[0], "5")
        await userEvent.type(yVals[0], "5")
        await userEvent.type(color,"#ff1111")
        
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
        
        expect(xVals.length).toBe(6) //checking that there are 6 x values
        expect(yVals.length).toBe(6) //checking that there are 6 y values
        await userEvent.click(generate)
        expect(chartImg).toBeDefined() //checking that the chart exists

        await userEvent.click(clearButton)

        expect(chartImg).toBe(null)  //checking that the chart clears
        expect(color.value).toBe("#ff4500")  //checking that the color resets

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