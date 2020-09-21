const { func } = require("prop-types")

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'Tester',
      username: 'test',
      password: '123456'
    })
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'User 2',
      username: 'user2',
      password: 'qwerty'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('Tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('abcdef')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: '123456' })
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('New Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('Url')
      cy.get('#create-button').click()
      cy.get('#blog-list').contains('New Title')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog 1',
          author: 'Author',
          url: 'Url'
        })
      })

      it('A blog can be liked', function () {
        cy.get('.details-button').click()
        cy.get('.like-button').click()
        cy.contains('likes: 1')
      })

      it('A blog can be removed by the owner', function () {
        cy.get('.details-button').click()
        cy.get('.remove-button').click()
        cy.get('#blog-list').should('not.contain', 'Blog 1')
      })

      it('A blog cannot be removed by another user', function () {
        cy.login({ username: 'user2', password: 'qwerty' })
        cy.visit('http://localhost:3000')
        cy.get('.details-button').click()
        cy.get('.remove-button').should('have.css', 'display', 'none')
      })

      it('Blogs are sorted by likes', function () {
        cy.createBlog({
          title: 'Blog 2',
          author: 'Author',
          url: 'Url',
          likes: 5
        })
        cy.createBlog({
          title: 'Blog 3',
          author: 'Author',
          url: 'Url',
          likes: 1
        })

        cy.get('.details-button').each(b => { b.click() })

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('likes: 5')
          cy.wrap(blogs[1]).contains('likes: 1')
          cy.wrap(blogs[2]).contains('likes: 0')
        })
      })
    })
  })
})