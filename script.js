// Password functionality
const passwordInput = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
const passwordPage = document.getElementById('password-page');
const mainPage = document.getElementById('main-page');

const correctPassword = 'bestie4ever';
let jumpCount = 0;
let isJumping = false
let startTime = 0;
let firstPopupShown = false;

function checkPassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === correctPassword) {
        if (!isJumping) {
            startJumpingGame();
        } else {
            // Successfully caught the button!
            isJumping = false;
            submitBtn.textContent = 'You got me nah! 😅';
            submitBtn.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                passwordPage.classList.remove('active');
                setTimeout(() => {
                    mainPage.classList.add('active');
                    startTypewriter();
                }, 300);
            }, 1000);
        }
    } else {
        errorMsg.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            passwordInput.style.animation = '';
            errorMsg.classList.add('hidden');
        }, 2000);
    }
}

function startJumpingGame() {
    isJumping = true;
    startTime = Date.now();
    firstPopupShown = false;
    submitBtn.textContent = 'Catch me! 😜';
    submitBtn.classList.add('catchable');
    startMovingButton();
    startTimer();
}

function startTimer() {
    // First popup after 30 seconds
    setTimeout(() => {
        if (isJumping && !firstPopupShown) {
            showPopup('😂😂😂');
            firstPopupShown = true;
        }
    }, 30000);
    
    // Second popup after 60 seconds total
    setTimeout(() => {
        if (isJumping) {
            showPopup('weh ashai u lol make i no over suffer u 😂');
            makeButtonEasy();
        }
    }, 60000);
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 20px;
        border-radius: 15px;
        font-size: 1.5rem;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        text-align: center;
    `;
    popup.textContent = message;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

function makeButtonEasy() {
    // Slow down the movement significantly
    submitBtn.style.transition = 'all 2s ease';
}

function startMovingButton() {
    const moveButton = () => {
        if (!isJumping) return;
        
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 100;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        submitBtn.style.left = randomX + 'px';
        submitBtn.style.top = randomY + 'px';
        
        // Check if button should be easy to catch
        const elapsed = Date.now() - startTime;
        const moveInterval = elapsed > 60000 ? 1500 : 300; // Much faster: 300ms instead of 800ms
        
        setTimeout(moveButton, moveInterval);
    };
    
    moveButton();
}

function jumpButton() {
    // Remove this function as we're using continuous movement instead
}

submitBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

// Typewriter effect
const typewriterElement = document.getElementById('typewriter');
const messages = [
    "Warning: Bestie overload detected! 🚨💕",
    "You're stuck with me forever, deal with it! 😜"
];

let messageIndex = 0;
let charIndex = 0;

function startTypewriter() {
    setTimeout(() => {
        typeWriter();
    }, 500);
}

function typeWriter() {
    if (messageIndex < messages.length) {
        if (charIndex < messages[messageIndex].length) {
            typewriterElement.textContent += messages[messageIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                typewriterElement.textContent = '';
                charIndex = 0;
                messageIndex++;
                if (messageIndex < messages.length) {
                    setTimeout(typeWriter, 500);
                }
            }, 2000);
        }
    }
}

// Friendship meter
const startTestBtn = document.getElementById('start-test');
const meterFill = document.getElementById('meter-fill');
const meterText = document.getElementById('meter-text');

startTestBtn.addEventListener('click', () => {
    startTestBtn.disabled = true;
    startTestBtn.textContent = 'Testing...';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            meterText.textContent = '100% Bestie Energy 💫';
            startTestBtn.textContent = 'Perfect! 🎉';
        } else {
            meterText.textContent = `${Math.floor(progress)}% Bestie Energy`;
        }
        meterFill.style.width = progress + '%';
    }, 200);
});

// Confetti animation
const confettiBtn = document.getElementById('confetti-btn');
const surpriseBtn = document.getElementById('surprise-btn');

confettiBtn.addEventListener('click', () => {
    confettiBtn.textContent = 'Self Destroy in 3...';
    confettiBtn.disabled = true;
    
    setTimeout(() => {
        confettiBtn.textContent = '2...';
    }, 1000);
    
    setTimeout(() => {
        confettiBtn.textContent = '1...';
    }, 2000);
    
    setTimeout(() => {
        confettiBtn.textContent = 'BOOM! 💥';
        startFalloutDestruction();
    }, 3000);
});

// Purple surprise
surpriseBtn.addEventListener('click', () => {
    document.body.classList.add('purple-mode');
    surpriseBtn.textContent = 'Surprise! 💜';
    surpriseBtn.disabled = true;
    
    createFlowersAndText();
    
    setTimeout(() => {
        alert('Bes Bes Bes! 💜 How would you rate this site in our chat? 1-10? 😏');
    }, 3000);
});

function createFlowersAndText() {
    const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '💜', '🦋'];
    const texts = ['Bes', 'Bes', 'Bes', 'Bes', 'Bes'];
    
    // Create flowers
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = Math.random() * window.innerWidth + 'px';
            flower.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(flower);
            
            setTimeout(() => flower.remove(), 4000);
        }, i * 100);
    }
    
    // Create text
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const text = document.createElement('div');
            text.className = 'bes-text';
            text.textContent = texts[Math.floor(Math.random() * texts.length)];
            text.style.left = Math.random() * (window.innerWidth - 100) + 'px';
            text.style.top = Math.random() * (window.innerHeight - 100) + 'px';
            text.style.animationDelay = Math.random() * 1 + 's';
            document.body.appendChild(text);
            
            setTimeout(() => text.remove(), 3000);
        }, i * 200);
    }
    
    // Classic romantic entrance with 2 images
    setTimeout(() => {
        // First image - romantic entrance
        const img1 = document.createElement('div');
        img1.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 250px;
            height: 250px;
            background-image: url('image copy 4.png');
            background-size: cover;
            background-position: center;
            border-radius: 20px;
            z-index: 9999;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: romanticEntrance 3s ease forwards;
        `;
        document.body.appendChild(img1);
        
        setTimeout(() => img1.remove(), 4000);
        
        // Original image with Bes4ever message - comes last
        setTimeout(() => {
            const img2 = document.createElement('div');
            img2.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                width: 300px;
                height: 350px;
                background-image: url('image.png');
                background-size: cover;
                background-position: center;
                border-radius: 20px;
                z-index: 9999;
                box-shadow: 0 30px 60px rgba(0,0,0,0.4);
                animation: romanticEntrance 3s ease forwards;
            `;
            document.body.appendChild(img2);
            
            // Add Bes4ever message
            const message = document.createElement('div');
            message.textContent = 'Bes4ever 💜';
            message.style.cssText = `
                position: fixed;
                bottom: 20%;
                left: 50%;
                transform: translateX(-50%) scale(0);
                font-family: 'Pacifico', cursive;
                font-size: 2rem;
                color: #fff;
                text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
                z-index: 10000;
                animation: messageAppear 2s ease forwards 1s;
            `;
            document.body.appendChild(message);
            
            setTimeout(() => {
                img2.remove();
                message.remove();
            }, 6000);
        }, 4500);
    }, 3500);
    
    // Show rating after romantic sequence
    setTimeout(() => {
        alert('Bes be Bes! 💜 How would you rate this site in our chat? 1-10? 😏');
    }, 14000);
}

}

function startFalloutDestruction() {
    // Make all elements fall apart
    const elements = document.querySelectorAll('h1, h3, p, .card, .fun-btn, .friendship-meter-container, .surprise-section');
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'fallout 2s ease-in forwards';
            el.style.animationDelay = Math.random() * 1 + 's';
        }, index * 100);
    });
    
    // Fade to white
    setTimeout(() => {
        const whiteOverlay = document.createElement('div');
        whiteOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: white;
            z-index: 10000;
            opacity: 0;
            animation: fadeToWhite 2s ease forwards;
        `;
        document.body.appendChild(whiteOverlay);
        
        // Purple gradient appears slowly
        setTimeout(() => {
            whiteOverlay.style.background = 'linear-gradient(135deg, #a29bfe, #6c5ce7)';
            whiteOverlay.style.animation = 'fadeToTransparent 3s ease forwards';
        }, 2000);
        
        // Show original image
        setTimeout(() => {
            const finalImg = document.createElement('div');
            finalImg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                width: 350px;
                height: 400px;
                background-image: url('image.png');
                background-size: cover;
                background-position: center;
                border-radius: 20px;
                z-index: 10001;
                box-shadow: 0 30px 60px rgba(0,0,0,0.4);
                animation: finalEntrance 3s ease forwards;
            `;
            document.body.appendChild(finalImg);
        }, 4000);
    }, 3000);
}

function createConfetti() {
    const colors = ['#fdcb6e', '#e17055', '#ff7675', '#fd79a8'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }, i * 50);
    }
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
