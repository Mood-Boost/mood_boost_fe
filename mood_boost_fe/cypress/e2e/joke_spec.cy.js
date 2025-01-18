describe('Joke Page', () => {
  beforeEach(() => {
    cy.intercept('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit', {
      statusCode: 200,
      body: [
        {
          "error": false,
          "category": "Programming",
          "type": "single",
          "joke": "How do you tell HTML from HTML5?\n- Try it out in Internet Explorer\n- Did it work?\n- No?\n- It's HTML5.",
          "flags": {
              "nsfw": false,
              "religious": false,
              "political": false,
              "racist": false,
              "sexist": false,
              "explicit": false
          },
          "id": 43,
          "safe": true,
          "lang": "en"
      }
      ]
    }).as('jokeAPI')

    cy.visit('https://mood-boost-fe.onrender.com/joke')
  })

  it('displays the navbar on page load', () => {
    cy.wait('@quoteAPI').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
    cy.get('button').should('have.class', 'login')
    cy.get('button.login').find('div')
    cy.get('.navbar').children().should('have.class', 'home')
    cy.get('.home').find('img').should('have.class', 'homebtn')
    cy.get('.home').find('img').should('have.attr', 'alt', 'Back to home page')
  })



})