describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Kuba Matczak',
      username: 'kuba',
      password: 'kuba',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('log in');
    cy.contains('username');
  });

  describe('login in', function () {
    it('tests successful login', function () {
      cy.get('#username').type('kuba');
      cy.get('#password').type('kuba');
      cy.contains('login').click();
      cy.contains('Kuba Matczak logged in');
      //   cy.login({ username: 'kuba', password: 'kuba' });
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('kuba');
      cy.contains('login').click();
      cy.get('.error').contains('wrong username');
    });
  });

  describe('When loged in', function () {
    beforeEach(function () {
      cy.get('#username').type('kuba');
      cy.get('#password').type('kuba');
      cy.contains('login').click();
      cy.login({ username: 'kuba', password: 'kuba' });
      cy.createNote({
        title: 'third note',
        url: 'www.ggole.pl',
        likes: 10,
        author: 'Macki',
      });

      cy.createNote({
        title: 'To delete',
        url: 'www.ggole.pl',
        likes: 10,
        author: 'Macki',
      });
      cy.createNote({
        title: 'To delete',
        url: 'www.ggole.pl',
        likes: 30,
        author: 'Macki',
      });
      cy.createNote({
        title: 'To delete',
        url: 'www.ggole.pl',
        likes: 20,
        author: 'Macki',
      });
    });

    it('A blog by user can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('New blog test');
      cy.get('#author').type('Roam Nowak');
      cy.get('#url').type('www.wiki.pl');
      cy.get('#create').click();
    });

    it('A user can like a blog', function () {
      cy.contains('view').click();
      cy.contains('vote').click();

      cy.contains('11');
    });

    it('A user can delete blog', function () {
      cy.contains('view').click();
      cy.contains('remove').click();

      //   cy.contains('thi').parent().find('button').get('#remove').click();

      cy.should('not.contain', 'third note');
    });
  });
});
