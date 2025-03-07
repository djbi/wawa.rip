function addPost() {
    const postContent = document.getElementById('new-post').value;
    if (postContent.trim() === '') return;

    const postList = document.getElementById('post-list');
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.textContent = `${postContent} - Posted on ${new Date().toLocaleString()}`;
    postList.prepend(postDiv);

    document.getElementById('new-post').value = ''; // Clear the textarea
}

// Sample posts on page load
window.onload = function() {
    const samplePosts = [
        "Welcome to wawa.rip!",
        "Bubble gum pink vibes forever."
    ];
    samplePosts.forEach(post => {
        const postList = document.getElementById('post-list');
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.textContent = `${post} - Posted on ${new Date().toLocaleString()}`;
        postList.appendChild(postDiv);
    });
};
        e.preventDefault(); // Prevent scrolling or zooming
        icon.click(); // Trigger the onclick event
    }, { passive: false });
});
