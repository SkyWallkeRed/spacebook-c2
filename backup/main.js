console.log('on');
// array 
var posts = [];
let divPosts = $('.posts');
//on click 
$('.add-post').on('click', function() {
    var input = $('#post-name').val();
    // console.log(input )
    posts.push({ input: input, id: 1 });
    renderPost();
})


// render POSTS to DOM func
function renderPost() {
    //empty display 
    divPosts.empty();
    for (let i = 0; i < posts.length; i++) {
        let comment = ('<p class="post" data-id="' + i + '">' + '<button type="button" class="remove">' + 'REMOVE' + '</button>' + posts[i].input + '</p>')
        posts[i].id = i;
        divPosts.append(comment);
    }

}
//findindexbyid 

$('.posts').on('click', '.remove', function() {
    // console.log(this);

    // console.log($(this).closest('.post'));

    pID = $(this).closest('.post').data('id');
    // splice 
    // posts[pID].splice(    ,     )

})