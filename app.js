const express = require('express');
const createError = require("http-errors");
const cors = require('cors');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

function makeApp(database) {
    
    const app = express();
    app.use(express.json());
    app.use( cors({
        origin: 'http://localhost:4200'
    }));

    app.get('/posts', catchAsync( async (req, res) => {
        const posts = await database.getPosts();
        console.log (posts);
        res.send(posts);
    }));

    app.patch("/posts/:id", catchAsync(async (req, res) => {

        console.log(req.body);
        const post = await database.findOne({ _id: req.params.id })
        if (!post) throw new ExpressError('Post not found', 400);
        if (!req.body.comments) throw new ExpressError('No comments to update', 400);
        post.comments = req.body.comments;
        await post.save();
        res.send(post);

    }));

    app.post('/chartPoints', catchAsync( async (req, res, next) => {

        if (!req.headers.apiKey) throw new ExpressError('Not Authenticated', 400);
        if (!req.body) throw new ExpressError('No data provided', 400);

        const post = await database.findOne({ _id: req.headers.apikey })
        
        if (!post) throw new ExpressError('No post found with that id', 400);
        post.chart.forEach(chart => {
            console.log(chart);
            for (let sensor in req.body) {
                console.log(sensor + ": "+ req.body[sensor]);
                if (chart.name == sensor) {
                    chart.series.push({name: new Date(), value: req.body[sensor]});
                } 
             }
        });
        console.log(post.chart);
        await post.save()
        res.send(post)


    }));

    // createChart needs to be completed and tested
    app.post('/createChart', catchAsync( async (req, res, next) => {
        
        if (!req.headers.apiKey) throw new ExpressError('Not Authenticated', 400);
        if (!req.body) throw new ExpressError('No data provided', 400);

        const newPost = new Post(req.body);
        //await newPost.save();
        console.log(newPost);
        res.redirect();
        res.send("making your product");

    }));

    app.all('*', (req, res, next) => {
        next(new ExpressError('Page Not Found', 404));
    });

    app.use((err, req, res, next) => {
        const { statusCode = 500, message = 'Something went wrong' } = err;
        res.status(statusCode).send(message);
    });

    app.post('/authenticate', (req, res, next) => {
        username = req.body.username;
        password = req.body.password;
    
        user = database.getUser(username, password);
        if (user==null) {
            return next(createError(404, 'usuario no encontrado'));
        } else {
            return res.send(user);
        }
    });
    return app;    
}


module.exports = makeApp;
