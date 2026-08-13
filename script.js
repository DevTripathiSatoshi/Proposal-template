const datePhase = document.getElementById("datePhase");
const carouselPhase = document.getElementById("carouselPhase");
const collagePhase = document.getElementById("collagePhase");

const startButton = document.getElementById("start_button");
const nextPhotoBtn = document.getElementById("nextPhotoBtn");
const toProposalBtn = document.getElementById("toProposalBtn");

const dateSelect = document.getElementById("dateSelect");
const carouselImg = document.getElementById("carouselImg");
const carouselQ = document.getElementById("carouselQ");
const collageGrid = document.getElementById("collageGrid");

const bgMusicPiano = document.getElementById("bgMusicPiano");
const bgMusicVocal = document.getElementById("bgMusicVocal");

// Variables for Proposal Phase
var questionMain = null;
var gifMain = null;
var yesButton = null;
var noButton = null;
var count = 0;
let noButtonEscapes = 0;

// 1. Populate Date Dropdown
for(let i=0; i<50; i++) {
    let opt = document.createElement("option");
    opt.value = "32aug";
    opt.innerHTML = "32 August, 2026";
    dateSelect.appendChild(opt);
}

// 2. Start Date Phase
startButton.addEventListener("click", () => {
    if (bgMusicPiano) {
        bgMusicPiano.play().catch(error => console.log("Audio autoplay prevented:", error));
    }
    datePhase.classList.add("hidden");
    carouselPhase.classList.remove("hidden");
});

// 3. Carousel Phase Logic
const carouselQuestions = [
    "Who is this cutie?",
    "Who is this hottie?",
    "Who is this handsome?",
    "Who is this adorable person?",
    "Who is this snacc?",
    "Who is this absolute model?",
    "Who is this angel?",
    "Who is this masterpiece?",
    "Who is this stunning human?",
    "Who is my everything?",
    "Who is this gorgeous soul?",
    "Who is the love of my life?"
];
let currentPhotoIndex = 1;

nextPhotoBtn.addEventListener("click", () => {
    currentPhotoIndex++;
    if (currentPhotoIndex <= 12) {
        carouselImg.src = `photo${currentPhotoIndex}.jpg`;
        carouselQ.innerHTML = carouselQuestions[(currentPhotoIndex-1) % carouselQuestions.length];
    } else {
        // Transition to Collage
        carouselPhase.classList.add("hidden");
        collagePhase.classList.remove("hidden");
        
        // Inject 12 photos into collage
        for(let i=1; i<=12; i++) {
            let img = document.createElement("img");
            img.src = `photo${i}.jpg`;
            collageGrid.appendChild(img);
        }
    }
});

// 4. Transition to Proposal Phase
toProposalBtn.addEventListener("click", () => {
    document.head.insertAdjacentHTML('beforeend', "<link rel='stylesheet' href='styleMain.css'/>");
    collagePhase.classList.add("hidden");

    const proposalHTML = "<div class='wrapper' id='proposalPhase'><h2 class='question' id='qMain'>Will you go out with me?</h2>"+
    "<img class='gif' id='gMain' alt='gif' src='https://media.giphy.com/media/0kDdAFAELmvvFNUKim/giphy.gif'/>"+
    "<div class='btn-group'><button class='yes-btn' id='yBtn'>Yes</button>"+
    "<button class='no-btn' id='nBtn'>No</button></div></div>";
    
    document.body.insertAdjacentHTML('beforeend', proposalHTML);

    questionMain = document.getElementById("qMain");
    gifMain = document.getElementById("gMain");
    yesButton = document.getElementById("yBtn");
    noButton = document.getElementById("nBtn");

    yesButton.addEventListener("click", yesButtonListener);
    noButton.addEventListener("click", noButtonListener);
});

// 5. Trick No Button Logic
const evadeMessages = [
    "Haha, you cannot lie",
    "you missed it brownie",
    "hehe, you are slow cutie",
    "nice try, but you're mine"
];

function noButtonListener(){
    if (noButtonEscapes < 4) {
        gifMain.src ="https://media.giphy.com/media/hbOgjMOUfLdWV2Ty1j/giphy.gif";
        questionMain.innerHTML = evadeMessages[noButtonEscapes];
        
        noButton.style.position = 'absolute';
        const noButtonRect = noButton.getBoundingClientRect();
        const maxX = window.innerWidth - noButtonRect.width;
        const maxY = window.innerHeight - noButtonRect.height;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        noButton.style.left = randomX + "px";
        noButton.style.top = randomY + "px";
        
        noButtonEscapes++;
    } else {
        // Morph into a Yes button
        noButton.innerHTML = "Yes";
        noButton.style.background = "rgba(251, 207, 232, 0.2)";
        noButton.style.color = "white";
        
        // Remove the evade listener, add Yes listener
        noButton.removeEventListener("click", noButtonListener);
        noButton.addEventListener("click", yesButtonListener);
        
        gifMain.src ="https://media.giphy.com/media/QuCslOrnS649PSCnn7/giphy.gif";
        questionMain.innerHTML = "Okay, okay, I'll make it easy for you...";
    }
}

function yesButtonListener(){
    startSlideshow();
}

// 6. Emotional Slideshow
function startSlideshow() {
    const slideshowHTML = `
        <div class="slideshow-container active" id="slideshowContainer">
            <div class="slide-content-wrapper" id="slideContent">
                <div class="slide-text" id="slideText"></div>
            </div>
            <button class="final-yes-btn" id="finalYesBtn">Yes</button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', slideshowHTML);
    const slideshowContainer = document.getElementById("slideshowContainer");
    const slideContent = document.getElementById("slideContent");
    const slideTextElement = document.getElementById("slideText");
    const finalYesBtn = document.getElementById("finalYesBtn");
    
    for(let i=0; i<15; i++) {
        let orb = document.createElement("div");
        orb.classList.add("vfx-orb");
        let size = Math.floor(Math.random() * 200) + 100;
        orb.style.width = size + "px";
        orb.style.height = size + "px";
        orb.style.left = Math.random() * 100 + "vw";
        orb.style.top = Math.random() * 100 + "vh";
        orb.style.animationDelay = (Math.random() * 5) + "s";
        slideshowContainer.appendChild(orb);
    }
    
    const sequenceData = [
        { type: "text", content: "meowwwwwww" },
        { type: "text", content: "Brownie, I know you've been afraid to fall in love again..." },
        { type: "text", content: "I know the world hasn't always been kind to you, my love." },
        { type: "text", content: "I know how much pain you hide behind that beautiful smile of yours." },
        { type: "text", content: "And I know you worry about so many things... even about us." },
        { type: "text", content: "But trust me, my everything. All we need is time and each other." },
        { type: "text", content: "I will do everything in my power to make your life beautiful." },
        { type: "text", content: "One day, we'll look back and realize the hard times were just stepping stones to us." },
        { type: "text", content: "I promise you, with all my heart, you will never be alone again." },
        { type: "text", content: "Even healthy relationships have ups and downs, but nothing will ever separate us." },
        { type: "text", content: "I love you simply because you deserve to be loved. Completely and unconditionally." },
        { type: "text", content: "I don't know how I fell so easily, or how I can express my love so openly with you." },
        { type: "text", content: "I could never do this with anyone else. You make me feel incredibly safe." },
        { type: "text", content: "Darling, take this as a sign... we are together because we are meant to be." },
        { type: "text", content: "If you feel like crying right now, wipe those tears, sweetie. I'm here to make you smile." },
        { type: "funny", content: "Spoiler: I still look silly, but I'm forever yours." },
        { type: "text", content: "Now, Here are some lyrics for you" },
        { type: "text", content: "I have died every day waiting for you..." },
        { type: "text", content: "Darling, don't be afraid, I have loved you..." },
        { type: "text", content: "For a thousand years..." },
        { type: "text", content: "I'll love you for a thousand more" },
        { type: "text", content: "Do you love me too?" }
    ];

    let currentIndex = 0;

    function showNextItem() {
        if (currentIndex < sequenceData.length) {
            slideContent.classList.remove("visible");
            
            setTimeout(() => {
                const item = sequenceData[currentIndex];
                
                if (item.content === "Now, Here are some lyrics for you") {
                    if (bgMusicPiano) bgMusicPiano.pause();
                    if (bgMusicVocal) bgMusicVocal.play().catch(e => console.log(e));
                }

                if (item.type === "funny") {
                    slideTextElement.innerHTML = `<img src="funny_photo.jpg" class="funny-photo"><br>${item.content}`;
                } else {
                    slideTextElement.innerHTML = item.content;
                }
                
                slideContent.classList.add("visible");
                
                if (currentIndex === sequenceData.length - 1) {
                    setTimeout(() => {
                        finalYesBtn.classList.add("visible");
                    }, 2000);
                } else {
                    currentIndex++;
                    let displayTime = item.type === "funny" || item.content.length > 100 ? 7000 : 5000;
                    setTimeout(showNextItem, displayTime); 
                }
            }, 1500); 
        }
    }

    setTimeout(showNextItem, 1000);

    finalYesBtn.addEventListener("click", () => {
        finalYesBtn.style.display = "none";
        slideContent.classList.remove("visible");
        setTimeout(() => {
            slideTextElement.innerHTML = "I love you too ❤️";
            slideContent.classList.add("visible");
            startHeartSpam();
        }, 1500);
    });
}

function startHeartSpam() {
    setInterval(() => {
        for(let i=0; i<5; i++){
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerHTML = "❤️";
            heart.style.left = Math.random() * 100 + "vw";
            const size = Math.random() * 1.5 + 0.5;
            heart.style.transform = `scale(${size})`;
            const duration = Math.random() * 3 + 2; 
            heart.style.animationDuration = `${duration}s`;
            document.body.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
    }, 100); 
}