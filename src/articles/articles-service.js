const ArticlesService = {
    getAllArticles(knexInstance) {
        return knexInstance.select('*').from('blogful_articles')
    },

    insertArticle(knexInstance, newArticle) {
        return knexInstance
            .insert(newArticle)
            .into('blogful_articles')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knexInstance, articleID) {
        return knexInstance
            .from('blogful_articles')
            .select('*')
            .where('id', articleID)
            .first()
    },

    deleteArticle(knexInstance, id) {
        return knexInstance('blogful_articles')
            .where({ id })
            .delete()
    },

    updateArticle(knexInstance, id, newArticleFields) {
        return knexInstance('blogful_articles')
            .where({ id })
            .update(newArticleFields)
    },
}

module.exports = ArticlesService