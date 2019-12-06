export default class BlogService {
    ROOT_URL = "https://services.etin.space/notes/"
    POSTS_URL = this.ROOT_URL + "wp-json/wp/v2/posts"

    getPosts = async (limit=10, offset=0) => {
        console.log("Getting posts");
        let response = await fetch(this.POSTS_URL + "?_embed", {
            method: 'GET'
        });
        let data = await response.json();
        return data;
    }

    getPostBySlug = async (slug) => {
        console.log("Getting Post");
        let response = await fetch(this.POSTS_URL + "?slug=" + slug, {
            method: 'GET'
        });
        let data = await response.json();
        return data[0];
    }
}