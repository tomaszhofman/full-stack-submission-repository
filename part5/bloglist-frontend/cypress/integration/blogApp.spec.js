// describe('Note app', function () {
//   beforeEach(function () {
//     cy.visit('http://localhost:3000');
//   });
//   it('front page can be opened', function () {
//     cy.get('#username').type('Ala');
//     cy.get('#password').type('test123');
//     cy.contains('submit').click();

//     cy.contains('Ala has logged in');
//   });
// });

// describe('when logged in ', function () {
//   beforeEach(function () {
//     cy.visit('http://localhost:3000');
//     cy.get('#username').type('Ala');
//     cy.get('#password').type('test123');
//     cy.contains('submit').parent().find('button').click();

//     cy.contains('Ala has logged in');
//   });
//   it('creates a new notes ', function () {
//     cy.contains('create new blog').click();
//     cy.get('#author').type('Julia');
//     cy.get('#title').type('google.com');
//     cy.get('#url').type('Julia Jsons');
//     cy.get('button[type="submit"]').click();
//   });
// });

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3002/api/testing/reset');
    const user = {
      name: 'Test user',
      username: 'Root12',
      password: 'password123',
    };
    cy.request('POST', 'http://localhost:3002/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log into application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Root12');
      cy.get('#password').type('password123');
      cy.contains('submit').parent().find('button').click();
      cy.contains('Root12 has logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Root12');
      cy.get('#password').type('wrongpassowrd');
      cy.contains('submit').parent().find('button').click();
      cy.contains('Wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Root12', password: 'password123' });
    });

    it('A blog can be created', function () {
      cy.get('button:contains("create new blog")').click();
      cy.get('#url').type('www.testblog.pl');
      cy.get('#author').type('Root 12');
      cy.get('#title').type('Great New Blog');
      cy.get('#create-blog').click();

      cy.contains('Great New Blog');
    });

    describe('if blog exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'Testing Title',
          author: 'Rocky Balboa',
          url: 'http://example.com',
        };

        cy.createBlog(blog);
      });

      it('user like a blog', function () {
        cy.contains('view').click();
        cy.get('#like').click();
      });

      it('user who created the blog can delete it', function () {
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.on('windows:confirm', () => true);
      });

      describe('add more blogs', function () {
        beforeEach(function () {
          const blog1 = {
            title: 'Testing Title',
            author: 'Rocky Balboa',
            url: 'http://example.com',
            likes: 2,
          };
          const blog2 = {
            title: 'Testing Title',
            author: 'Rocky Balboa',
            url: 'http://example.com',
            likes: 1,
          };
          const blog3 = {
            title: 'Testing Title',
            author: 'Rocky Balboa',
            url: 'http://example.com',
            likes: 5,
          };
          cy.createBlog(blog1);
          cy.createBlog(blog2);
          cy.createBlog(blog3);
        });
      });
    });
  });
});
