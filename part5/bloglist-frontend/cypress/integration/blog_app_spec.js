describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'test_user',
            name: 'E2E test user',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function() {
        cy.contains('Login to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('input[name=Username').type('test_user')
            cy.get('input[name=Password]').type('password')
            cy.get('#login-button').click()
            cy.contains('Welcome E2E test user')
        })
        it('fails with wrong credentials', function() {
            cy.get('input[name=Username').type('not_valid_user')
            cy.get('input[name=Password').type('abc')
            cy.get('#login-button').click()
            cy.get('.error').contains('Invalid username or password')
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('input[name=Username').type('test_user')
            cy.get('input[name=Password]').type('password')
            cy.get('#login-button').click()
            cy.contains('Welcome E2E test user')
        })
        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('input[name=blogTitle').type('new blog 1')
            cy.get('input[name=blogAuthor').type('new author 1')
            cy.get('input[name=blogurl]').type('new blog url 1')
            cy.get('#createNewBlogButton').click()
            cy.contains('Blog added successfully')
            cy.contains('new blog 1')
            cy.contains('new author 1')
        })
        it('A blog can be liked', function() {
            cy.contains('create new blog').click()
            cy.get('input[name=blogTitle').type('blog to like')
            cy.get('input[name=blogAuthor').type('new author 2')
            cy.get('input[name=blogurl]').type('www.newurl.newurl')
            cy.get('#createNewBlogButton').click()
            cy.contains('Blog added successfully')
            cy.contains('blog to like')
            cy.contains('new author 2')
            cy.contains('likes: 0')
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('likes: 1')
            
        })
        it('A blog can be removed', function() {
            cy.contains('create new blog').click()
            cy.get('input[name=blogTitle').type('blog to remove')
            cy.get('input[name=blogAuthor').type('remove author')
            cy.get('input[name=blogurl]').type('new blog url')
            cy.get('#createNewBlogButton').click()
            cy.contains('Blog added successfully')
            cy.contains('blog to remove')
            cy.contains('remove author')
            cy.contains('view').click()
            cy.contains('remove').click()
            
        })
    })
})