var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//---------------------------------------------------------------------------------------
const SERVER_PORT = 8080;
//---------------------------------------------------------------------------------------
mongoose.connect('mongodb://localhost/spacebookDB', () => {
        console.log("DB connection established!!!");
    })
    //-----------------------------------------------------------------------------------
var Post = require('./models/postModel');
// var Comm = require('./models/postModel');
//---------------------------------------------------------------------------------------
var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//---------------------------------------------------------------------------------------
// These will define your API:
//---------------------------------------------------------------------------------------
// 1) to handle getting all posts and their comments
app.get('/posts', (req, res) => {
    Post.find().exec((err, posts) => {
        if (err) {
            console.error(err)
            res.sendStatus(500).send("sorry");
        } else {
            // console.log(posts)
            res.send(posts);
        }
    })
});
//---------------------------------------------------------------------------------------
// 2) to handle adding a post
app.post('/posts', (req, res) => {
    var newPost = new Post(req.body);
    newPost.save((err, post) => {
        if (err) {
            console.log(err);
        } else {
            console.log('POST ADDED')
            res.send(post);
        }
    })
});
//---------------------------------------------------------------------------------------
// 3) to handle deleting a post
app.delete(`/posts/:id/`, (req, res) => {
    var id = req.params.id;
    Post.findByIdAndRemove(id, (err, it) => {
        if (err) {
            console.log(err)
        } else {
            console.log(id + ' REMOVED')
        }
    })
});
//---------------------------------------------------------------------------------------
// 4) to handle adding a comment to a post
app.put(`/posts/:id`, (req, res) => {
    var id = req.params.id;
    var newcomment = (req.body);
    Post.findOneAndUpdate({ _id: id }, { $push: { comments: newcomment } }, { new: true }, (err, doc) => {
        if (err) {
            console.error(err);
        }
        console.log(doc);
    });
})

//---------------------------------------------------------------------------------------
// 5) to handle deleting a comment from a post
app.delete(`/posts/:postid/:commentid`, (req, res) => {

    var postID = req.params.postid;
    var commentID = req.params.commentid;
    console.log(postID)
    console.log(commentID)

    Post.findOneAndUpdate({ _id: postID }, {
        $pull: {
            comments: {
                _id: commentID
            }
        }
    }, (err, doc) => {
        if (err) {
            console.error(err)
        } else {
            console.log('comment :' + commentID + ' REMOVED')
        }
    })
});
//---------------------------------------------------------------------------------------
app.listen(SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
});
//-------------------------------------------------------------------------------------------