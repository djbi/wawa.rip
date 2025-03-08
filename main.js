// script.js
// Post Creation Functionality
function createPost() {
    const postInput = document.getElementById('postInput');
    const postsContainer = document.getElementById('postsContainer');
    const postText = postInput.value.trim();

    if (postText) {
        // Create new post element
        const postElement = document.createElement('div');
        postElement.className = 'post';

        // Add post content
        const content = document.createElement('p');
        content.textContent = postText;
        postElement.appendChild(content);

        // Add timestamp
        const timestamp = document.createElement('div');
        timestamp.className = 'post-timestamp';
        timestamp.textContent = new Date().toLocaleString();
        postElement.appendChild(timestamp);

        // Add to container
        postsContainer.insertBefore(postElement, postsContainer.firstChild);
        
        // Reset input
        postInput.value = '';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Enter key posting
    document.getElementById('postInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            createPost();
        }
    });
});
