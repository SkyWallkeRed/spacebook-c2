import postApi from './Api.js';

/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
        this.posts = [];
    }
    async initData() {
        // console.log('calling');
        this.posts = await postApi.fetch();
    }


    async addPost(postText) {
        var newPost = { text: postText };
        let result = await $.ajax({
            method: "POST",
            url: '/posts',
            data: newPost
        })
        this.posts.push(result)
    }

    async removePost(id) {
        await $.ajax({
            method: "DELETE",
            url: `/posts/` + id,
        });
        await this.initData();
    }

    async addComment(newComment, postID) {
        await $.ajax({
            method: "PUT",
            url: '/posts/' + postID,
            data: newComment
        });

        // change the data 
    };

    async deleteComment(postID, commentID) { // neew more work !?!?!!

        await $.ajax({
            method: "DELETE",
            url: '/posts/' + postID + '/' + commentID,

        });
        // chzange the data
    }
}


export default PostsRepository