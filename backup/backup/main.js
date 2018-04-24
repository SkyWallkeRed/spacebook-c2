// prevents pressing ENTER to refresh page 
$(function() {
    $("form").submit(function() { return false; });
});

let posts = [];
// 'dispaly' DIV in DOM
var display = $(".posts");

//on click btn 
$(".add-post").on('click', function() {
    //input VAL
    var postText = $("#post-name").val();
    //  ()   input  
    addPost(postText);
    renderPosts();
})
display.on('click', '.goComment', function() {
    //gets the index of the parent <p> [this = is the btn]
    let id = $(this).closest("form").find('.post').attr("data-id");
    var index = getIndexByID(id)
    var commentName = $(this).closest("form").find('.commentName').val();
    var commentComment = $(this).closest("form").find('.commentComment').val();
    addComment(commentName, commentComment, index);
    renderComments(index, id)

})

//render comments index is the index of the ID selected
function renderComments(index, id) {
    // $(`[data-id='` + id + `']`).empty();
    // display.empty();
    //loops posts comments and 
    for (let z = 0; z < posts[index].comments.length; z++) {
        // render them into the right place via ID
        $(`[data-id='` + id + `']`).append('<li>' + posts[index].comments[z].comentUser +
            ' ' + posts[index].comments[z].comment + '</li>');
    }
}

// render the posts arr 
function renderPosts() {
    display.empty();
    // loops posts Arr and append the OBJs
    // debugger
    for (let i = 0; i < posts.length; i++) {
        display.append(`<form action="">
      <p class='post' data-id=` + posts[i].ids + `> ` + posts[i].texts +
            ` <button type='button' class='remove'  data-id=` + i +
            `>REMOVE</button>` + `</p>
     <input type="text" name="" class="commentName" placeholder="name">
     <input type="text" name="" class="commentComment" placeholder="comment">
     <ul class = "postComment">
     </ul>
     <button class = "goComment"type="button">go</button>
     </form>`)

        // renderComments(getIndexByID(posts[i].ids), posts[i].ids);
    }
};

//on click remove the cliced OBJ and remove it from the posts Arr
display.on("click", ".remove", function() {
        //get the id from the clicked <p> 
        var id = $(this).attr("data-id");
        index = getIndexByID(id)
        posts.splice(index, 1);
        renderPosts();
    })
    // create an OBJ and push into posts Arr 
function addPost(texts) {
    var postIds = creatID();
    let post = {
        texts: texts,
        ids: postIds,
        comments: []
    }
    posts.push(post);
}
// adds a comment into posts OBJ > Arr
function addComment(commentName, commentComment, index) {
    let obj = { comentUser: commentName, comment: commentComment }
    posts[index].comments.push(obj);
}
//gets INDEX by ID
function getIndexByID(id) {
    var index = posts.map(function(el) {
        return el.ids;
    }).indexOf(id);
    return index;
}

// creats a random unic mf ID 
function creatID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}