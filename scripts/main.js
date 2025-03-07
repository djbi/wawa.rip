/* Reset default styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body styles for full-screen layout */
body {
    font-family: Arial, sans-serif;
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: #ffffff;
    overflow: hidden;
    cursor: none; /* Remove default cursor */
    -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
    -webkit-user-select: none; /* Prevent selection on mobile */
    user-select: none; /* Prevent selection on desktop */
    touch-action: none; /* Improve touch interaction on mobile */
}

/* Container for main content with full visibility */
.container {
    text-align: center;
    width: 100%;
    height: 100%;
    z-index: 2;
    position: relative;
}

/* Main content styling */
.main-content {
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Space between elements */
}

/* Neon text for "Faith" */
.neon-text {
    font-size: clamp(60px, 15vw, 150px); /* Increased default and max size */
    color: #ff00ff; /* Neon pinkish-purple */
    text-shadow: 0 0 5px #cc0099, 0 0 10px #cc0099, 0 0 20px #990066, 0 0 40px #990066, 0 0 80px #990066; /* Adjusted glow */
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
    letter-spacing: 5px;
    user-select: none;
    cursor: none; /* Prevent pointer cursor */
}

/* Social icons container */
.social-icons {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap; /* Allow wrapping on small screens */
    cursor: none; /* Prevent cursor change */
}

/* Social link styling */
.social-link {
    cursor: none; /* Prevent pointer cursor */
    display: inline-block; /* Ensure proper rendering */
}

/* Social logo styling with pink outer glow */
.social-logo {
    width: clamp(30px, 6vw, 50px); /* Responsive size */
    height: clamp(30px, 6vw, 50px);
    filter: drop-shadow(0 0 15px #ff69b4) drop-shadow(0 0 30px #ff69b4); /* Increased glow */
    user-select: none;
    transition: transform 0.2s;
    cursor: none; /* Prevent pointer cursor */
}

.social-logo:hover {
    transform: none; /* No hover effect */
}

/* Heart text styling for "<3" and "Cocaine Woman" */
.heart-text {
    font-size: clamp(16px, 4vw, 24px); /* Same size for both */
    color: #ff00ff;
    margin-top: 10px;
    animation: heartbeat 1s infinite;
    text-shadow: 0 0 5px #ff69b4, 0 0 15px #ff69b4, 0 0 30px #ff1493, 0 0 60px #ff1493, 0 0 120px #ff1493; /* Increased glow */
    user-select: none;
    cursor: none; /* Prevent pointer cursor */
}

/* Specific styling for "Cocaine Woman" with blink effect */
#cocaineText {
    animation: heartbeat 1s infinite, blink 0.3s infinite; /* Blink every 0.3 seconds */
}

/* Remove rotateHeart animation for "Cocaine Woman" */
@keyframes rotateHeart {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Heartbeat animation (shared) */
@keyframes heartbeat {
    0% { text-shadow: 0 0 5px #ff69b4, 0 0 15px #ff69b4, 0 0 30px #ff1493; }
    50% { text-shadow: 0 0 10px #ff69b4, 0 0 30px #ff69b4, 0 0 60px #ff1493; }
    100% { text-shadow: 0 0 5px #ff69b4, 0 0 15px #ff69b4, 0 0 30px #ff1493; }
}

/* Blink animation for "Cocaine Woman" */
@keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
}

/* Splash screen styling */
.splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default; /* Ensure clickable area */
}

/* Counter styling with consistent size and spaces */
.counter {
    font-size: clamp(24px, 6vw, 48px); /* Consistent size across devices */
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    justify-content: center;
    gap: 10px; /* Space between digits */
    user-select: none;
    position: relative;
    z-index: 4; /* Ensure above canvas */
}

.counter span {
    display: inline-block;
}

/* Custom cursor with glow and color change matching "Faith" */
.custom-cursor {
    position: fixed;
    width: clamp(12px, 3vw, 20px);
    height: clamp(12px, 3vw, 20px);
    color: #ff00ff; /* Initial neon pink */
    font-size: clamp(12px, 3vw, 20px);
    text-align: center;
    line-height: clamp(12px, 3vw, 20px);
    pointer-events: none;
    z-index: 10;
    transform: translate(-50%, -50%);
    opacity: 0; /* Hidden until moved */
    transition: opacity 0.1s;
    text-shadow: 0 0 5px #cc0099, 0 0 10px #cc0099, 0 0 20px #990066, 0 0 40px #990066, 0 0 80px #990066; /* Matching glow */
    background: linear-gradient(45deg, #ff00ff, #990066, #ff00ff); /* Gradient like Faith */
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: colorShift 6s infinite linear; /* Matching animation */
}

.custom-cursor:before {
    content: '♡';
}

.custom-cursor.visible {
    opacity: 1; /* Ensure visibility when active */
}

@keyframes colorShift {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
}

/* Note input styling */
#noteInput {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 10px;
    z-index: 11;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#noteTextarea {
    width: 300px;
    height: 150px;
    padding: 10px;
    font-size: 16px;
    background: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    resize: none;
}

#sendNote {
    padding: 10px 20px;
    font-size: 16px;
    background: #ff69b4;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#sendNote:hover {
    background: #ff1493;
}

/* Canvas for mouse trail effects */
#trailCanvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    pointer-events: none;
    z-index: 1;
}

/* Responsive design refinements */
@media (max-width: 768px) {
    .neon-text {
        font-size: clamp(50px, 12vw, 120px);
    }
    .social-logo {
        width: clamp(30px, 5vw, 40px);
        height: clamp(30px, 5vw, 40px);
    }
    .heart-text {
        font-size: clamp(16px, 3vw, 20px);
    }
    .counter {
        font-size: clamp(20px, 5vw, 36px);
    }
    .custom-cursor {
        font-size: clamp(10px, 2.5vw, 16px);
        width: clamp(10px, 2.5vw, 16px);
        height: clamp(10px, 2.5vw, 16px);
        line-height: clamp(10px, 2.5vw, 16px);
    }
    #noteTextarea {
        width: 200px;
        height: 100px;
    }
}

@media (max-width: 480px) {
    .neon-text {
        font-size: clamp(40px, 10vw, 100px);
    }
    .social-logo {
        width: clamp(20px, 4vw, 30px);
        height: clamp(20px, 4vw, 30px);
    }
    .heart-text {
        font-size: clamp(12px, 2.5vw, 16px);
    }
    .counter {
        font-size: clamp(16px, 4vw, 24px);
    }
    .custom-cursor {
        font-size: clamp(8px, 2vw, 12px);
        width: clamp(8px, 2vw, 12px);
        height: clamp(8px, 2vw, 12px);
        line-height: clamp(8px, 2vw, 12px);
    }
    #noteTextarea {
        width: 150px;
        height: 80px;
    }
}
