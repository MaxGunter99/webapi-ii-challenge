const express = require('express');

const router = express.Router();

const Posts = require('./db');

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The posts information could not be retrieved.',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The posts information could not be retrieved.',
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Posts.insert(req.body);
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error while saving the post to the database.',
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'The post has been nuked.' });
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The post could not be removed.',
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.params.id, req.body);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Please provide title and contents for the post.',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const contents = await Posts.findById(req.params.id);
        if (contents.length > 0) {
            res.status(200).json(contents);
        } else {
            res.status(404).json({ message: 'No messages for this post' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error retrieving messages for post' })
    }
})

router.post('/:id', async (req, res) => {
    const contentsInfo = { ...req.body, id: req.params.id };
    try {
        const contents = await Posts.put(contentsInfo);
        res.status(201).json(contents)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error adding message to post' })
    }
})

module.exports = router;