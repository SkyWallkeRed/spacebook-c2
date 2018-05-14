import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js';


//-----------------------------------------------------------------------------------
let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);
//-----------------------------------------------------------------------------------
async function loadPage() {
    await postsRepository.initData();
    postsRenderer.renderPosts(postsRepository.posts);
    // console.log(postsRepository.posts);
}
//-----------------------------------------------------------------------------------
loadPage();
eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();

//-----------------------------------------------------------------------------------