const Article = require('../models').Article;
const User = require('../models').User;


module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: function (req, res) {
        let articleArgs = req.body;
        
        let errorMsg = '';
        if (!req.isAuthenticated()) {
            errorMsg = 'You must be logged in to make articles!';
        }
        else if(!articleArgs.title){
            errorMsg = 'Invalid title!';
        }
        else if(!articleArgs.content){
            errorMsg = 'Invalid content!';
        }

        if (errorMsg) {
            res.render('article/create', {
                error: errorMsg,
                title: articleArgs.title,
                contect: articleArgs.contect
            });
            
            return;
        }
        articleArgs.authorId = req.user.id;

        Article
            .create(articleArgs)
            .then(article => {
                res.redirect('/');
            });
    },
    details: function (req, res){
        let id = req.params.id;
        Article.findById(id, {include: [
            {
                model: User,
            }
        ]
    }).then(article => {
            res.render('article/details', article.dataValues)
        });
    } 
};