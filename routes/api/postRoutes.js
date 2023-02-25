const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const data = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update
router.put('/id', withAuth, async (req, res) => {
    try {
        const data = await Post.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(data);
    } catch (err) {
        response.status(500).json(err);        
    }
});
//delete
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const data = await Post.destroy({
            where: {
                id: req.params.id,
            }
        })
        
        request.status(200).json(data);
    } catch (err) {
        request.status(500).json(err);
    }
});

module.exports = router;