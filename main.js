// prevents pressing ENTER to refresh page 
$(function() {
    $("form").submit(function() { return false; });
});
// posts array 
let posts = [];
// 'dispaly' DIV in DOM
var display = $(".posts");

//on click btn 
$(".add-post").on('click', function() {
    //input VAL
    var postText = $("#post-name").val();
    //gets a GUID[unic ID] from a func  
    var postIds = creatID();
    //  ()   input  |  arr length
    addPost(postText, postIds);
    //   ()
    renderPosts();
})

//   pushs OBJ into posts arr
function addPost(texts, ids) {
    // creat OBJ with text and id 
    let post = {
        texts: texts,
        ids: ids,
        comments: []
    }
    posts.push(post);
}

display.on('click', '.goComment', function() {
        console.log(this);
        // commnent comment NAME
        var commentName = $('.commentName').val();
        // comment comment COMMENT
        var commentComment = $('.commentComment').val();
        //creat key value pair obj
        let obj = { comentUser: commentName, comment: commentComment }
            //gets the index of the parent <p> [this = is the btn]
        let index = $(this).closest("form").find('.post').attr("data-id");
        console.log(index)
            // the index comes back as a 'string' here we make it a number
        index = Number(index);
        //push OBJ in to Arr in postas 'comments'
        posts[index].comments.push(obj);
        //      ()
        renderComments(index, this)
    })
    //####################################################################
    // trying to render the comments in every obj ###### NOT-WORKING #####
    //####################################################################
function renderComments(index) {


    for (let z = 0; z < posts[index].comments.length; z++) {

        // console.log('append after this console')
        // NEEDS TO BE MORE SPECIFIC
        $('.postComment').append('<li>' + posts[index].comments[z].comentUser +
            ' ' + posts[index].comments[z].comment + '</li>');
    }

}


//##########################################################################
// render the posts arr 
function renderPosts() {
    // clear the display DIV
    display.empty();
    // loops posts Arr and append the OBJs
    for (let i = 0; i < posts.length; i++) {
        display.append(`<form action="">
      <p class='post' data-id=` + i + `> ` + posts[i].texts + ` <button type='button' class='remove'  data-id=` + i + `>REMOVE</button>` + `</p>
     <input type="text" name="" class="commentName" placeholder="name">
     <input type="text" name="" class="commentComment" placeholder="comment">
     <ul class = "postComment">
     </ul>
     <button class = "goComment"type="button">go</button>
     </form>`)
        renderComments(i);
    }

};

//on click remove the cliced OBJ and remove it from the posts Arr
display.on("click", ".remove", function() {
    //get the id from the clicked <p> 
    var position = $(this).attr("data-id");
    // cuts the posts Arr  of OBJ data-id to the next one 
    posts.splice(position, 1);

    // renderPosts();  %%%%%%%%%%%%%%%%%%%%%  i have comment this invoke to check , check it later %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
})



// creats a random unic mf ID 
function creatID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}