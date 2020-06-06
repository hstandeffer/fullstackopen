describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: "harrison",
      username: "hstandeffer",
      password: "test123"
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('sees blogs', function() {
    cy.contains('blogs')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('hstandeffer')
      cy.get('#password').type('test123')
      cy.get('#submitLogin').click()
      cy.get('html').should('contain', 'harrison is logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('hstandeffer')
      cy.get('#password').type('wrong')
      cy.get('#submitLogin').click()
      cy.get('html').should('not.contain', 'harrison is logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'hstandeffer', password: 'test123' })
    })

    it('can create a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('hstandeffers first blog post')
      cy.get('#author').type('jimbo')
      cy.get('#url').type('franklin.land')
      cy.get('#submitBlog').click()

      cy.get('#blogList').children().should('have.length', 1)
      cy.contains('hstandeffers first blog post by jimbo')
    })

    describe('When a blog is posted', function() {
      beforeEach(function() {
        cy.addBlog({
          title: 'hstandeffers first blog post',
          author: 'jimbo',
          url: 'franklin.land'
        })
      })
  
      it('can like a blog', function() {
        cy.get('#blogList').children()
          .contains('view details').click()
          .get('.likeButton').click()
        cy.contains('1 likes')
      })

      it('can delete a blog if the user created it', function() {
        cy.get('#blogList').children()
          .contains('view details').click()
          .get('.removeButton').click()

        cy.get('html').should('not.contain', 'hstandeffers first blog post')
      })

      it.only('can confirm blogs are sorted by likes', function() {
        cy.addBlog({
          title: 'hstandeffers second blog post',
          author: 'jimbo',
          url: 'franklin.landd'
        })

        cy.get('#blogList').children()
          .contains('view details').click()
          .parent().parent().find('button').contains('like').click()

        cy.get('#blogList').children().eq(0).should('contain', '1 likes')
        cy.get('#blogList').children().eq(1).should('contain', '0 likes')
      })
    })
  })
})
