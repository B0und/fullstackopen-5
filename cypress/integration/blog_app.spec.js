// describe('Blog app', function () {
//   beforeEach(function () {
//     cy.request('POST', 'http://localhost:3003/api/testing/reset')
//     cy.request('POST', 'http://localhost:3003/api/users', {
//       username: 'user1',
//       password: 'user1pw',
//       name: 'test'
//     }).then((response) => {
//       localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
//       cy.visit('http://localhost:3000')
//     })
//   })

//   it('front page can be opened', function () {
//     cy.visit('http://localhost:3000')
//     cy.contains('username')
//     cy.contains('password')
//   })

//   describe('Login',function() {

//     it('login fails with wrong password', function () {
//       cy.get('#username').type('wrong')
//       cy.get('#password').type('wrong')
//       cy.get('#login-button').click()

//       cy.get('.error').contains('wrong credentials')
//     })

//     it('user can log in', function () {
//       cy.get('#username').type('user1')
//       cy.get('#password').type('user1pw')
//       cy.get('#login-button').click()
//       cy.contains('test logged-in')
//     })
//   })

//   describe('when logged in', function () {
//     beforeEach(function() {
//       cy.login({ username: 'user1', password: 'user1pw' })  })

//     it('a new blog can be created', function () {
//       cy.contains('new blog').click()
//       cy.get('#title').type('test title')
//       cy.get('#author').type('test author')
//       cy.get('#url').type('test url')

//       cy.contains('Create a new blog').click()
//       cy.contains('added blog')
//     })
//   })
// })
