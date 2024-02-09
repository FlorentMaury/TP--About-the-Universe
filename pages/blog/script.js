let allPosts = [];

onInit();

async function onInit() {
    await getPosts();
}

async function getPosts() {
    const response = await fetch('https://freefakeapi.io/api/posts');
    const posts = await response.json();
    displayBlogPosts(posts);
}