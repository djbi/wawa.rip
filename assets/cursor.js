document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) {
        console.error('Custom cursor element not found');
        return;
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.pageX - 10}px`;
        cursor.style.top = `${e.pageY - 10}px`;
    });
});
