class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    async p() {
        console.log('calling')
        let data = await this.postsRepository.initData();
        this.postsRenderer.renderPosts(data);
        return data
            // console.log(.posts);
    }


    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!");
            } else {
                this.postsRepository.addPost($input.val());
                this.postsRenderer.renderPosts(this.p());
                $input.val("");
            }
        });
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let id = $(event.currentTarget).closest('.post').attr("data-id");
            this.postsRepository.removePost(id);
            this.postsRenderer.renderPosts(this.p());
        });
    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
        });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');

            if ($comment.val() === "" || $user.val() === "") {
                alert("Please enter your name and a comment!");
                return;
            }
            let postID = $(event.currentTarget).closest('.post').attr("data-id");
            let postIndex = $(event.currentTarget).closest('.post').index();
            let newComment = { text: $comment.val(), user: $user.val() };

            this.postsRepository.addComment(newComment, postID);
            this.postsRenderer.renderComments(this.p(), postIndex);
            $comment.val("");
            $user.val("");
        });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            //
            let postID = $(event.currentTarget).closest('.post').attr("data-id");
            //
            let postIndex = $(event.currentTarget).closest('.post').index();
            //
            let commentID = $(event.currentTarget).closest('.comment').attr("data-id");
            //
            let commentIndex = $(event.currentTarget).closest('.comment').index();

            this.postsRepository.deleteComment(postID, commentID);
            this.postsRenderer.renderComments(this.p(), postIndex);
        });
    }
}

export default EventsHandler