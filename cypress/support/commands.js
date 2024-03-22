// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require("@testing-library/cypress/add-commands")
//Enters the first point for a chart
Cypress.Commands.add("enterFirstPoint", function(v1,v2){
    cy.findByLabelText("X").type(v1)
    cy.findByLabelText("Y").type(v2)
})
//creates a new point in the chart and enters values
Cypress.Commands.add("enterNewPoint", function(v1, v2){
    cy.findByRole("button", {name: "+"}).click()
    cy.wait(1000)
    cy.findAllByLabelText("X").last().type(v1)
    cy.findAllByLabelText("Y").last().type(v2)
})
//Enters chart title and labels
Cypress.Commands.add("nameAndLabelChart", function( name, x, y){
    cy.findByLabelText("Chart title").type(name)
    cy.findByLabelText("X label").type(x)
    cy.findByLabelText("Y label").type(y)
    
})
//Checks chart name and labels
Cypress.Commands.add("checkChartNameAndLabels", function(cName, xName, yName){
   cy.findByLabelText("Chart title").should("have.value", cName)
   cy.findByLabelText("X label").should("have.value", xName)
   cy.findByLabelText("Y label").should("have.value", yName)
   
})
//checks that four X values are present on the page and have the given values
Cypress.Commands.add("checkFourXValues", function( x1, x2, x3, x4){
    cy.findAllByLabelText("X").eq(0).should("have.value", x1)
    cy.findAllByLabelText("X").eq(1).should("have.value", x2)
    cy.findAllByLabelText("X").eq(2).should("have.value", x3)
    cy.findAllByLabelText("X").eq(3).should("have.value", x4)
    
 })
//checks that four Y values are present on the page and have the given values
Cypress.Commands.add("checkFourYValues", function( y1, y2, y3, y4){
    cy.findAllByLabelText("Y").eq(0).should("have.value", y1)
    cy.findAllByLabelText("Y").eq(1).should("have.value", y2)
    cy.findAllByLabelText("Y").eq(2).should("have.value", y3)
    cy.findAllByLabelText("Y").eq(3).should("have.value", y4)
 })



