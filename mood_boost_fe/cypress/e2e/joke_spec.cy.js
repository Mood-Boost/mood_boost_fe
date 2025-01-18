describe('Joke Page', () => {
  beforeEach(() => {
    cy.intercept('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit', {
      statusCode: 200,
      body: [
        {
          "error": false,
          "category": "Programming",
          "type": "single",
          "joke": "Debugging is like being the detective in a crime movie where you're also the murderer at the same time.",
          "flags": {
              "nsfw": false,
              "religious": false,
              "political": false,
              "racist": false,
              "sexist": false,
              "explicit": false
          },
          "id": 42,
          "safe": true,
          "lang": "en"
        }
      ]
    }).as('jokeAPI')

    cy.visit('https://mood-boost-fe.onrender.com/joke')
  })

  it('displays the navbar on page load', () => {
    cy.wait('@jokeAPI').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      })
    cy.get('button').should('have.class', 'login')
    cy.get('button.login').find('div')
    cy.get('.navbar').children().should('have.class', 'home')
    cy.get('.home').find('img').should('have.class', 'homebtn')
    cy.get('.home').find('img').should('have.attr', 'alt', 'Back to home page')
  })

  it('displays title and description on page load', () => {
    cy.wait('@jokeAPI').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      })
    cy.get('h1').contains('Laugh It Up: Your Daily Dose of Chuckles')
    cy.get('p').contains("Welcome to the joke page, where bad puns, dad jokes, and knee-slappers come to find their forever home! Whether you're looking for a laugh-out-loud moment or just an eye-roll-worthy groan, we’ve got you covered")
  })

  it('displays a joke on page load', () => {
    cy.wait('@jokeAPI')
    cy.get('.joke-area').children('h2').should('have.class', 'current-joke')
    // cy.get('.joke-area').children('h2', { timeout: 10000 }).should('contain', "Debugging is like being the detective in a crime movie where you're also the murderer at the same time.")
  })

  it('has a joke button', () => {
    cy.get('.get-joke').contains("Tell Me A Joke")
  })
})