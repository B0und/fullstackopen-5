describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'user1',
      password: 'user1pw',
      name: 'test'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('user1')
      cy.get('#password').type('user1pw')
      cy.get('#login-button').click()
      cy.contains('test logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user1', password: 'user1pw' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')

      cy.contains('Create a new blog').click()
      cy.contains('Added blog')
      cy.contains('test title')
    })

    describe('A few blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'blog1', author: 'author1', url: 'url1' })
        cy.createBlog({ title: 'blog2', author: 'author2', url: 'url2' })
        cy.createBlog({ title: 'blog3', author: 'author3', url: 'url3' })
      })

      it('Blog can be liked', function () {
        cy.contains('blog1').contains('Show').click()
        cy.contains('0')
        cy.contains('url1')
        cy.should('not.contain', 'url2')
        cy.contains('like').click()
        cy.contains('1')
      })

      it('Blog can be deleted', function () {
        cy.contains('blog1').contains('Show').click()
        cy.contains('url1')
        cy.contains('Remove').click()
        cy.should('not.contain', 'blog1')
      })

      it.only('Blogs are re-ordered by likes count', function () {
        cy.contains('blog3').contains('Show').click()
        cy.contains('blog3').contains('like').click()

        cy.get('.blog').then((blogs) => {
          const firstItem = blogs[0].innerText.slice(0, 5)
          const secondItem = blogs[1].innerText.slice(0, 5)
          const thirdItem = blogs[2].innerText.slice(0, 5)

          expect(firstItem).to.match(/blog3/)
          expect(secondItem).to.match(/blog1/)
          expect(thirdItem).to.match(/blog2/)
        })
      })
    })
  })
})
