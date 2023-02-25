const router = require('express').Router();
const { User, Post, Comment } = require('/../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        postsData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [{model: User}],
                }
            ],
        });

        const posts = postsData.map((post) =>
            post.get({ plain: true })
        );

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'], 
                },
                {
                    model: Comment,
                    include: [{model: User}]
                },
            ],
        });

        const post = postData.get({ plain: true });
        res.render('post', { post, loggedIn: req.session.loggedIn,
         });
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);        
    }
});

router.get('/create-post', withAuth, async (req, res) => {
    try {
        res.render('create-post', {
            loggedIn: req.session.loggedIn,
        });
        
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, { attributes: { exclude: ['password'] }});
        
        const user = userData.get({ plain: true });

        const userPosts = await Post.findAll({
            
            where: { 
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [{model: User}],
                }
            ],
    });

        const posts = userPosts.map((post) => posts.get({plain: true}));

        res.render('dashboard', {
            posts,
            user,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });