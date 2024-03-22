//Author: Andrew Hays
//Description: CS 362 Final Project - e2e tests

//Test 1: Chart is correctly generated
it("Chart is correctly generated", function(){
    cy.visit('/')
    //user visits the Line chart page
    cy.findByRole("link", {name: "Line"}).click()
    //user enters labels and first point
    cy.findByLabelText("Chart title").type("Humans vs. Ants")
    cy.findByLabelText("X label").type("Humans")
    cy.findByLabelText("Y label").type("Ants")
    cy.findByRole("button", {name: "+"})
    cy.findByLabelText("X").type("1000")
    cy.findByLabelText("Y").type("1")
    //Simulate user repeatedly clicking button to add a point, then entering in values for a new point
    cy.findByRole("button", {name: "+"}).click()
    cy.wait(1000) //Wait for a second to make sure new input appears, a real user would not instantaneously enter new data
    cy.findAllByLabelText("X").last().type("5000")
    cy.findAllByLabelText("Y").last().type("2")
    cy.findByRole("button", {name: "+"}).click()
    cy.wait(1000)
    cy.findAllByLabelText("X").last().type("10000")
    cy.findAllByLabelText("Y").last().type("3")
    cy.findByRole("button", {name: "+"}).click()
    cy.wait(1000)
    cy.findAllByLabelText("X").last().type("20000")
    cy.findAllByLabelText("Y").last().type("4")
    //Can't directly recreate the user clicking a color, so we simulate the user picking a chart color in this way
    cy.findByLabelText("Chart color").invoke('val', '#0000ff').trigger('change',{force: true });
    //generate the chart
    cy.findByRole('button', {name: "Generate chart"}).click()
    //Assert that Image is in the document
    cy.findByRole("img").should("be.visible")
})

//Test 2: Chart data should be maintained across pages
it("Chart data is maintained across pages", function(){
    //chart axis names and labels to be entered 
    const cName = "Humans vs. Ants"
    const xName = "Humans", yName = "Ants"
    //points to be entered
    const x1 = "1", y1 = "1000"
    const x2 = "2", y2 = "5000"
    const x3 = "3", y3 = "10000"
    const x4 = "4", y4 = "20000"
    const color = "#0000ff" //blue
    cy.visit('/')
    //Enter data into line page
    cy.findByRole("link", {name: "Line"}).click()
    //verify we switched pages
    cy.url().should("include", "/line")
    //creates name "Humans vs. Ants"
    cy.nameAndLabelChart(cName, xName, yName)
    cy.enterFirstPoint(x1,y1)
    cy.enterNewPoint(x2,y2)
    cy.enterNewPoint(x3,y3)
    cy.enterNewPoint(x4,y4)
    //Can't directly recreate the user clicking a color, so we simulate the user picking a chart color in this way
    cy.findByLabelText("Chart color").invoke('val', color).trigger('change',{force: true });
    //Switch to scatter page
    cy.findByRole("link", {name:"Scatter"}).click()
    //verify we switched pages
    cy.url().should("include", "/scatter")
    //asserts that name and label inputs remained the same
    cy.checkChartNameAndLabels(cName,xName,yName)
    //check num of X inputs, 5th added when switching page
    cy.findAllByLabelText("X").should("have.length", 5) 
    //asserts that Four X inputs present with correct values
    cy.checkFourXValues(x1,x2,x3,x4)
    //Check num Y inputs
    cy.findAllByLabelText("Y").should("have.length", 5)
    //asserts that Four Y inputs present with correct values
    cy.checkFourYValues(y1,y2,y3,y4)
    //Check that color input is still blue
    cy.findByLabelText("Chart color").should('have.value', color)
    //repeat process for bar page
    cy.findByRole("link", {name:"Bar"}).click()
    cy.url().should("include", "/bar")
    cy.checkChartNameAndLabels(cName,xName,yName)
    cy.findAllByLabelText("X").should("have.length", 5) 
    cy.checkFourXValues(x1,x2,x3,x4)
    cy.findAllByLabelText("Y").should("have.length", 5)
    cy.checkFourYValues(y1,y2,y3,y4)
    cy.findByLabelText("Chart color").should('have.value', color)
    //return to line page and repeat process
    cy.findByRole("link", {name:"Line"}).click()
    cy.url().should("include", "/line")
    cy.checkChartNameAndLabels(cName,xName,yName)
    cy.findAllByLabelText("X").should("have.length", 5) 
    cy.checkFourXValues(x1,x2,x3,x4)
    cy.findAllByLabelText("Y").should("have.length", 5)
    cy.checkFourYValues(y1,y2,y3,y4)
    cy.findByLabelText("Chart color").should('have.value', color)

})

//test 3 : saving a chart to the gallery
it("Saves a chart to the gallery", function(){
    //chart axis names and labels to be entered 
    const cName = "Humans vs. Ants"
    const xName = "Humans", yName = "Ants"
    //points to be entered
    const x1 = "1", y1 = "1000"
    const x2 = "2", y2 = "5000"
    const x3 = "3", y3 = "10000"
    const x4 = "4", y4 = "20000"
    const color = "#0000ff" //blue
    cy.visit('/')
    //visit the Line graph page and create a chart with four points
    cy.findByRole("link", {name: "Line"}).click()
    cy.nameAndLabelChart(cName, xName, yName)
    cy.enterFirstPoint(x1,y1)
    cy.enterNewPoint(x2,y2)
    cy.enterNewPoint(x3,y3)
    cy.enterNewPoint(x4,y4)
    cy.findByLabelText("Chart color").invoke('val', color).trigger('change',{force: true });
    //generate and save the chart
    cy.findByRole('button', {name: "Generate chart"}).click()
    cy.findByRole('button', {name: "Save chart"}).click()
    cy.findByRole("link", {name: "Gallery"}).click()
    //Assert that chart image is visible with correct name
    cy.findByRole("img", {name: cName}).should("be.visible")
    //Assert that chart title is present 
    cy.findByText("Humans vs. Ants").should("be.visible")
  
})

//Test 4: re-opening a saved chart
it("Re-opens a saved chart", function(){
       //chart axis names and labels to be entered 
       const cName = "Humans vs. Ants"
       const xName = "Humans", yName = "Ants"
       //points to be entered
       const x1 = "1", y1 = "1000"
       const x2 = "2", y2 = "5000"
       const x3 = "3", y3 = "10000"
       const x4 = "4", y4 = "20000"
       const color = "#0000ff" //blue
       cy.visit('/')
       //visit the Line graph page and create a chart with four points
       cy.findByRole("link", {name: "Line"}).click()
       cy.nameAndLabelChart(cName, xName, yName)
       cy.enterFirstPoint(x1,y1)
       cy.enterNewPoint(x2,y2)
       cy.enterNewPoint(x3,y3)
       cy.enterNewPoint(x4,y4)
       cy.findByLabelText("Chart color").invoke('val', color).trigger('change',{force: true });
       //generate and save the chart
       cy.findByRole('button', {name: "Generate chart"}).click()
       cy.findByRole('button', {name: "Save chart"}).click()
       cy.findByRole("link", {name: "Gallery"}).click()
       //click on the chart image
       cy.findByRole("img", {name: cName}).click()
       //verify that clicking image causes redirect
       cy.url().should("contain", "/line")
       //verify that all of the chart fields re-appear correctly
       cy.checkChartNameAndLabels(cName,xName,yName)
       cy.findAllByLabelText("X").should("have.length", 5) 
       cy.checkFourXValues(x1,x2,x3,x4)
       cy.findAllByLabelText("Y").should("have.length", 5)
       cy.checkFourYValues(y1,y2,y3,y4)
       cy.findByLabelText("Chart color").should('have.value', color)
       //assert that the image is displayed
       cy.findByRole("img").should("be.visible")

})
