const { expect } = require('chai');
const moment = require('moment');
const knex = require('knex');
const app = require('../src/app');
const { makeArticlesArray } = require('./articles.fixtures');




describe.only('Articles Endpoints', () => {
  let db;

  before('Make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db);
  })

  after('Disconnect from db', () => db.destroy());

  before('Clean the table', () => db('blogful_articles').truncate());

  afterEach('Clean up', () => db('blogful_articles').truncate());

  describe(`GET /articles`, () => {
    context(`Given no articles`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/articles')
          .expect(200, [])
      })
    })

    context('Given there are articles in the database', () => {
      const testArticles = makeArticlesArray()

      beforeEach('insert articles', () => {
        return db
          .into('blogful_articles')
          .insert(testArticles)
      })

      it('responds with 200 and all of the articles', () => {
        return supertest(app)
          .get('/articles')
          .expect(200, testArticles)
      })
    })
  })

  describe(`GET /articles/:article_id`, () => {
    context(`Given no articles`, () => {
      it(`responds with 404`, () => {
        const articleId = 123456
        return supertest(app)
          .get(`/articles/${articleId}`)
          .expect(404, { error: { message: `Article doesn't exist` } })
      })
    })

    context('Given there are articles in the database', () => {
      const testArticles = makeArticlesArray()

      beforeEach('insert articles', () => {
        return db
          .into('blogful_articles')
          .insert(testArticles)
      })

      it('responds with 200 and the specified article', () => {
        const articleId = 2
        const expectedArticle = testArticles[articleId - 1]
        return supertest(app)
          .get(`/articles/${articleId}`)
          .expect(200, expectedArticle)
      })
    })
  })

  describe(`POST /articles`, () => {
    it(`creates an article, responding with 201 and the new article`, function () {
      this.retries(3);
      const newArticle = {
        title: 'Test new article',
        style: 'Listicle',
        content: 'Test new article content...'
      }
      return supertest(app)
        .post('/articles')
        .send(newArticle)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(newArticle.title)
          expect(res.body.style).to.eql(newArticle.style)
          expect(res.body.content).to.eql(newArticle.content)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/articles/${res.body.id}`)
          /* BROKEN TIMESTAMP COMPARISON */
          const expected = moment(new Date().toLocaleString());
          const actual = moment(new Date(res.body.date_published).toLocaleString());
          expect(actual).to.eql(expected)
          /* END: BROKEN TIMESTAMP COMPARISON */
        })
        .then(postRes =>
          supertest(app)
            .get(`/articles/${postRes.body.id}`)
            .expect(postRes.body)
        )
    })
       const requiredFields = ['title', 'style', 'content']
    
       requiredFields.forEach(field => {
         const newArticle = {
           title: 'Test new article',
           style: 'Listicle',
           content: 'Test new article content...'
         }
         it(`responds with 400 and an error message when the '${field}' is missing`, () => {
           delete newArticle[field]
           return supertest(app)
             .post('/articles')
             .send(newArticle)
             .expect(400, {
               error: { message: `Missing '${field}' in request body` }
             })
         })
       })
  })
})