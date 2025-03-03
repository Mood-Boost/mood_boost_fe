describe('Quote Page', () => {
  beforeEach(() => {
    cy.intercept('https://api.realinspire.live/v1/quotes/random', {
      statusCode: 200,
      body: [
        {
            "content": "Your mind is infinite, it's your doubts that are limiting.",
            "author": "Robert Kiyosaki",
            "authorSlug": "robert-kiyosaki",
            "length": 58
        }
      ]
    }).as('quoteAPI')

    cy.visit('https://mood-boost-fe.onrender.com/quote')
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

  it('displays title and description on page load', () => {
    cy.wait('@quoteAPI')
    cy.get('h1').contains('Find Your Spark: Daily Inspiration to Boost Your Mood')
    cy.get('p').contains('Welcome to your daily dose of inspiration!')
  })

  it('displays a quote on page load', () => {
    cy.wait('@quoteAPI')
    cy.get('.quote-container').children('h2').should('have.id', 'speech-bubble')
    cy.get('#speech-bubble').children('#quote-content').should('contain', 'Your mind is infinite,')
    cy.get('#speech-bubble').children('#quote-author').should('contain', 'Robert Kiyosaki')
  })

  it('displays a button to generate new quote on page load', () => {
    cy.wait('@quoteAPI')
    cy.get('button').should('have.class', 'new-quote')
    cy.get('button').should('contain', 'Generate New Quote')
  })

  it('displays a new quote when the generate new quote button is clicked', () => {
    cy.intercept('https://api.realinspire.tech/v1/quotes/random', {
      statusCode: 200,
      body: [
        {
            "content": "No duty is more urgent than that of returning thanks.",
            "author": "James Allen",
            "authorSlug": "james-allen",
            "length": 53
        }
    ]
    }).as('getNewQuote')

    cy.get('button.new-quote').click
    cy.get('.quote-container').children('h2').should('have.id', 'speech-bubble')
    cy.get('#speech-bubble').children('#quote-content').should('contain', 'No duty is more urgent than that of returning thanks.')
    cy.get('#speech-bubble').children('#quote-author').should('contain', 'James Allen')
  })
})