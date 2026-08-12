const startButton = document.getElementById("start_button");
const bgMusicPiano = document.getElementById("bgMusicPiano");
const bgMusicVocal = document.getElementById("bgMusicVocal");

var questionMain = null;
var gifMain = null;
var yesButton = null;
var noButton = null;
var count = 0;

startButton.addEventListener("click", () => {
    // Start piano background music
    if (bgMusicPiano) {
        bgMusicPiano.play().catch(error => console.log("Audio autoplay was prevented:", error));
    }

    // Switch to main proposal screen
    document.head.innerHTML = "<meta charset='UTF-8'>" +
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
        "<title>Do You Love Me?</title>" +
        "<link rel='stylesheet' href='styleMain.css'/>";

    document.body.innerHTML = "<div class='wrapper'><h2 class='question'>Will you go out with me?</h2>" +
        "<img class='gif' alt='gif' src='https://media.giphy.com/media/0kDdAFAELmvvFNUKim/giphy.gif'/>" +
        "<div class='btn-group'><button class='yes-btn'>Yes</button>" +
        "<button class='no-btn'>No</button></div></div>";

    questionMain = document.querySelector(".question");
    gifMain = document.querySelector(".gif");
    yesButton = document.querySelector(".yes-btn");
    noButton = document.querySelector(".no-btn");

    yesButton.addEventListener("click", yesButtonListener);
    noButton.addEventListener("click", noButtonListener);
});

function noButtonListener() {
    if (count < 5) {
        gifMain.src = "https://media.giphy.com/media/hbOgjMOUfLdWV2Ty1j/giphy.gif";
        questionMain.innerHTML = "You don't love me?";
    }
    else if (count >= 5 && count < 10) {
        gifMain.src = "https://media.giphy.com/media/QuCslOrnS649PSCnn7/giphy.gif";
        questionMain.innerHTML = "Stop playing with me! Do you love me or not?!";
    }
    else {
        gifMain.src = "https://media.giphy.com/media/8OPf6xrtXi3QEcu5h9/giphy.gif";
        questionMain.innerHTML = "JUST ANSWER IT! DO YOU LOVE ME?!";
    }

    // Make the No button absolute for random placement
    noButton.style.position = 'absolute';

    const noButtonRect = noButton.getBoundingClientRect();
    const maxX = window.innerWidth - noButtonRect.width;
    const maxY = window.innerHeight - noButtonRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
    count = count + 1;
}

function yesButtonListener() {
    // Start the romantic slideshow instead of just showing the success GIF immediately
    startSlideshow();
}

function startSlideshow() {
    // Create the slideshow container
    const slideshowHTML = `
        <div class="slideshow-container active" id="slideshowContainer">
            <div class="slide-text" id="slideText"></div>
            <button class="final-yes-btn" id="finalYesBtn">Yes</button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', slideshowHTML);
    const slideshowContainer = document.getElementById("slideshowContainer");
    const slideTextElement = document.getElementById("slideText");
    const finalYesBtn = document.getElementById("finalYesBtn");

    // Generate VFX Orbs
    for (let i = 0; i < 10; i++) {
        let orb = document.createElement("div");
        orb.classList.add("vfx-orb");
        // Random size between 100px and 300px
        let size = Math.floor(Math.random() * 200) + 100;
        orb.style.width = size + "px";
        orb.style.height = size + "px";
        orb.style.left = Math.random() * 100 + "vw";
        orb.style.top = Math.random() * 100 + "vh";
        // Random animation delay
        orb.style.animationDelay = (Math.random() * 5) + "s";
        slideshowContainer.appendChild(orb);
    }

    const lines = [
        "Hi",
        "So, now I'm officially Proposing to you, my love",
        "No matter what the world says",
        "Nobody matters more than you",
        "I will love you without any conditions, no matter if you feel low, weak, or unconfident",
        "You are absolutely perfect to me, exactly the way you are.",
        "I don't need you to say a word to know how beautiful your soul is.",
        "Your smile is the only voice I ever need to hear.",
        "I promise to always be your safe place and hold your hand through everything.",
        "Now, Here are some lyrics for you",
        "I have died every day waiting for you...",
        "Darling, don't be afraid, I have loved you...",
        "For a thousand years...",
        "I'll love you for a thousand more",
        "Do you love me too?"
    ];

    let currentLineIndex = 0;

    function showNextLine() {
        if (currentLineIndex < lines.length) {
            slideTextElement.classList.remove("visible");

            setTimeout(() => {
                // Check if we are at the lyrics transition text
                if (lines[currentLineIndex] === "Now, Here are some lyrics for you") {
                    if (bgMusicPiano) bgMusicPiano.pause();
                    if (bgMusicVocal) bgMusicVocal.play().catch(e => console.log(e));
                }

                slideTextElement.innerHTML = lines[currentLineIndex];
                slideTextElement.classList.add("visible");

                if (currentLineIndex === lines.length - 1) {
                    // Last line ("Do you love me too?")
                    setTimeout(() => {
                        finalYesBtn.classList.add("visible");
                    }, 2000);
                } else {
                    currentLineIndex++;
                    // Each slide stays for a bit plus transition times
                    setTimeout(showNextLine, 5000);
                }
            }, 1500); // Wait for fade out before changing text
        }
    }

    // Start the first line
    setTimeout(showNextLine, 1000);

    finalYesBtn.addEventListener("click", () => {
        finalYesBtn.style.display = "none";
        slideTextElement.innerHTML = "I love you too ❤️";
        startHeartSpam();
    });
}

function startHeartSpam() {
    setInterval(() => {
        // Generate 5 hearts per interval for 5x density
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerHTML = "❤️";

            // Random horizontal position
            heart.style.left = Math.random() * 100 + "vw";
            // Random size variation
            const size = Math.random() * 1.5 + 0.5;
            heart.style.transform = `scale(${size})`;
            // Random animation duration for varied speeds
            const duration = Math.random() * 3 + 2;
            heart.style.animationDuration = `${duration}s`;

            document.body.appendChild(heart);

            // Remove the heart after animation ends
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
    }, 100); // Create 5 new hearts every 100ms
}