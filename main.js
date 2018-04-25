var SpacebookApp = function() {
    var posts = [{
            text: "Hello world",
            id: 0,
            comments: [
                { text: "Man, this is a comment!" },
                { text: "Man, this is a comment!" },
                { text: "Man, this is a comment!" }
            ]
        },
        {
            text: "Hello world",
            id: 1,
            comments: [
                { text: "Man, this is a comment!" },
                { text: "Man, this is a comment!" },
                { text: "Man, this is a comment!" }
            ]
        },
        {
            text: "Hello world",
            id: 2,
            comments: [
                { text: "Man, this is a comment!" },
                { text: "Man, this is a comment!" },
                { text: "Man, this is a comment!" }
            ]
        }
    ];

    // the current id to assign to a post
    var currentId = 3;
    var $posts = $('.posts'); // DISPLAY 

    var creatGuid = function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    var _findPostById = function(id) {
        for (var i = 0; i < posts.length; i += 1) {
            if (posts[i].id === id) {
                return posts[i];
            }
        }
    }

    // var getIndexByID = posts.map(function(el) {
    //     return el.id;
    // }).indexOf(4);

    var createPost = function(text) {
        var post = {
            text: text,
            id: currentId,
            comments: []
        }

        currentId += 1;

        posts.push(post);
    }

    var renderPosts = function() {
        $posts.empty();

        for (var i = 0; i < posts.length; i += 1) {
            var post = posts[i];

            var commentsContainer = '<div class="comments-container" data-id="' + app.posts[i].id + '" >' +
                '<ul class ="commentList">' + '</ul>' +
                '<input type="text" class="comment-name">' +
                '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

            $posts.append('<div class="post" data-id=' + post.id + '>' +
                '<a href="#" class="remove">remove-post</a> ' + '<a href="#" class="show-comments">comments</a> ' +
                `<br>` + post.text +
                commentsContainer + '</div>');

            this.renderComments(post.id);
        }

    }

    var removePost = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        var id = $clickedPost.data().id;

        var post = _findPostById(id);

        posts.splice(posts.indexOf(post), 1);
        $clickedPost.remove();
    }


    var toggleComments = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        $clickedPost.find('.comments-container').toggleClass('show');
    }
    var createComment = function(text, currentPostBtn) {
        var $clickedPost = $(currentPostBtn).closest('.post');
        var id = $clickedPost.data().id;
        // let index = getIndexByID(id)
        posts[id].comments.push({ text })
    }

    var renderComments = function(postID) { // post = {text, id , comments[]} , posts = []
        let post = _findPostById(postID);
        let $currentPost = $(".post[data-id=" + post.id + "]");
        $currentPost.find('.commentList').empty();
        for (let z = 0; z < post.comments.length; z++) {
            let $commentsList = $currentPost.find('.commentList');
            $commentsList.append('<li>' + post.comments[z].text + ':   <a href="#" class="removeComment">remove-comment</a>' + '</li>')
        }
    }

    var removeComment = function() {
        //comment data-id[to make]
        //get data-id from DOM 
        //get spacific index of post 
        //remove comment with data-id from 'posts[i].comments'


    }

    return {
        posts,
        creatGuid: creatGuid,
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,
        createComment: createComment,
        renderComments: renderComments,
        // removeComment: removeComment,
        toggleComments: toggleComments
    }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function() {
    var text = $('#post-name').val();

    app.createPost(text);
    app.renderPosts();
});

$('.posts').on('click', '.remove', function() {
    app.removePost(this);
});

$('.posts').on('click', '.show-comments', function() {
    app.toggleComments(this);

});
$('.posts').on('click', '.add-comment', function() {
    var text = $(this).prev().val();
    app.createComment(text, this);


    let postID = $(this).closest('.post').data().id;

    app.renderComments(postID);
})

//##########################################




// var getCurrentComment = function(currentPostBtn) {
//     var $currentComment = $(currentPostBtn).closest('.add-comment').val();
//     console.log($currentComment);
// }