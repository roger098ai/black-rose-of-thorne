/* =========================
   ENTER WEBSITE
========================= */

const enterBtn = document.getElementById("enterBtn");
const intro = document.getElementById("intro");
const website = document.getElementById("website");


enterBtn.addEventListener("click", () => {

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        website.classList.remove("hidden");

        showWelcomeBackMessage();

        startMysteryMessages();

    }, 800);

});



/* =========================
   LAUNCH DATE
========================= */

const launchDate = new Date("September 6, 2026 00:00:00").getTime();



/* =========================
   COUNTDOWN
========================= */

function updateCountdown() {

    const now = new Date().getTime();

    const difference = launchDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        unlockBook();

        return;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


setInterval(updateCountdown, 1000);

updateCountdown();



/* =========================
   COVER REVEAL
========================= */

function updateCoverReveal() {

    const today = new Date();

    const revealStart = new Date("August 30, 2026 00:00:00");

    const overlay = document.getElementById("coverOverlay");


    if (today < revealStart) {

        overlay.style.opacity = "1";

        return;

    }


    const daysPassed = Math.floor(
        (today - revealStart) /
        (1000 * 60 * 60 * 24)
    );


    /*
        AUG 30 = 15%
        AUG 31 = 30%
        SEP 1 = 45%
        SEP 2 = 60%
        SEP 3 = 75%
        SEP 4 = 90%
        SEP 5+ = FULL
    */

    const opacitySteps = [

        0.85,
        0.70,
        0.55,
        0.40,
        0.25,
        0.10,
        0

    ];


    const opacity =
        opacitySteps[
            Math.min(daysPassed, opacitySteps.length - 1)
        ];


    overlay.style.opacity = opacity;

}


updateCoverReveal();



/* =========================
   UNLOCK BOOK
========================= */

function unlockBook() {

    const button =
        document.getElementById("wattpadBookBtn");

    const accessMessage =
        document.getElementById("accessMessage");


    button.classList.remove("locked-btn");

    button.classList.add("unlocked-btn");


    button.textContent =
        "READ THE BLACK ROSE OF THORNE →";


    button.href =
        "YOUR_WATTPAD_BOOK_LINK";


    accessMessage.innerHTML = `

        IT'S OPEN.

        <br>

        <span>
            You've been warned.
        </span>

    `;


    document.getElementById(
        "coverOverlay"
    ).style.opacity = "0";

}



/* =========================
   LOCKED BUTTON MESSAGE
========================= */

document
    .getElementById("wattpadBookBtn")
    .addEventListener("click", function(event) {

        if (
            !this.classList.contains("unlocked-btn")
        ) {

            event.preventDefault();

            showPopup(
                "Nice try. Not yet."
            );

        }

    });



/* =========================
   MYSTERY POPUPS
========================= */

const mysteryMessages = [

    "You stayed.",

    "Interesting.",

    "You came here on purpose.",

    "Or did you?",

    "You've been reading for a while.",

    "Take your time.",

    "There's no rush.",

    "You keep coming back to that.",

    "I noticed.",

    "Still curious?",

    "I knew you wouldn't leave yet.",

    "Some people know when to stop.",

    "You don't seem to be one of them.",

    "Keep looking.",

    "Maybe you'll find what you're searching for."

];



function showPopup(message) {

    const popup =
        document.getElementById("mysteryPopup");

    const popupText =
        document.getElementById("popupText");


    popupText.textContent = message;

    popup.classList.add("show");


    setTimeout(() => {

        popup.classList.remove("show");

    }, 5000);

}



/* =========================
   RANDOM POPUP SYSTEM
========================= */

function startMysteryMessages() {

    setTimeout(() => {

        showRandomMessage();

        setInterval(() => {

            showRandomMessage();

        }, randomTime());

    }, 15000);

}


function showRandomMessage() {

    const randomIndex =
        Math.floor(
            Math.random() *
            mysteryMessages.length
        );


    showPopup(
        mysteryMessages[randomIndex]
    );

}


function randomTime() {

    return Math.floor(
        Math.random() *
        (90000 - 40000) +
        40000
    );

}



/* =========================
   RETURNING VISITOR
========================= */

function showWelcomeBackMessage() {

    const visitedBefore =
        localStorage.getItem("visitedBefore");


    if (visitedBefore) {

        setTimeout(() => {

            showPopup(
                "You came back."
            );

        }, 3000);


        setTimeout(() => {

            showPopup(
                "I was wondering if you would."
            );

        }, 9000);

    }


    localStorage.setItem(
        "visitedBefore",
        "true"
    );

}



/* =========================
   READER STATUS
========================= */

const readerMessages = [

    `You said one chapter.
    <br>
    That's what everyone says.`,

    `Current status:
    <br>
    emotionally attached.`,

    `One more chapter.
    <br>
    A dangerous lie.`,

    `You knew they were fictional.
    <br>
    You fell anyway.`,

    `No judgement here.
    <br>
    We all like red flags.`

];


const readerMessage =
    document.getElementById("readerMessage");


const randomReaderMessage =
    readerMessages[
        Math.floor(
            Math.random() *
            readerMessages.length
        )
    ];


readerMessage.innerHTML =
    randomReaderMessage;



/* =========================
   BOTTOM OF PAGE MESSAGE
========================= */

let bottomMessageShown = false;


window.addEventListener("scroll", () => {

    if (bottomMessageShown) return;


    const scrollPosition =
        window.innerHeight +
        window.scrollY;


    const pageHeight =
        document.body.offsetHeight;


    if (
        scrollPosition >=
        pageHeight - 100
    ) {

        bottomMessageShown = true;

        showPopup(
            "You read everything."
        );


        setTimeout(() => {

            showPopup(
                "Most people don't."
            );

        }, 6000);

    }

});

/* =========================
   THE HIDDEN ROSE
========================= */

const hiddenRose =
    document.getElementById("hiddenRose");

const secretMessage =
    document.getElementById("secretMessage");

const secretText =
    document.getElementById("secretText");


const roseMessages = [

    "You found it.",

    "Curiosity has always been dangerous.",

    "Some things are hidden for a reason.",

    "The rose was never meant for everyone.",

    "You looked closer.<br><br>That's where it starts.",

    "You came looking for a story.<br><br>Be careful what finds you instead."

];


hiddenRose.addEventListener("click", () => {

    const randomMessage =
        roseMessages[
            Math.floor(
                Math.random() *
                roseMessages.length
            )
        ];


    secretText.innerHTML =
        randomMessage;


    secretMessage.classList.add("active");


    setTimeout(() => {

        secretMessage.classList.remove("active");

    }, 5000);

});

/* =========================
   LAUNCH PROGRESSION
========================= */

function updateLaunchProgress() {

    const now = new Date();

    const description =
        document.getElementById("bookDescription");


    const accessMessage =
        document.getElementById("accessMessage");


    const aug30 =
        new Date("August 30, 2026 00:00:00");

    const aug31 =
        new Date("August 31, 2026 00:00:00");

    const sep1 =
        new Date("September 1, 2026 00:00:00");

    const sep3 =
        new Date("September 3, 2026 00:00:00");

    const sep5 =
        new Date("September 5, 2026 00:00:00");


    if (now < aug30) {

        description.textContent =
            "Some doors stay locked for a reason.";

    }


    else if (now >= aug30 && now < aug31) {

        description.textContent =
            "Something is coming.";

    }


    else if (now >= aug31 && now < sep1) {

        description.textContent =
            "You keep coming back here. Interesting.";

    }


    else if (now >= sep1 && now < sep3) {

        description.textContent =
            "The rose isn't ready to bloom yet.";

    }


    else if (now >= sep3 && now < sep5) {

        description.textContent =
            "You're waiting for it, aren't you?";

    }


    else if (now >= sep5 && now < launchDate) {

        description.textContent =
            "Tomorrow, you get to meet them.";

        accessMessage.innerHTML = `

            ONE NIGHT LEFT.

            <br>

            <span>
                Sleep while you still can.
            </span>

        `;

    }


    else if (now >= launchDate) {

        description.textContent =
            "The door is open.";

    }

}


updateLaunchProgress();

/* =========================
   SPECIAL DATE MESSAGES
========================= */

function showDateBasedMessage() {

    const now = new Date();

    const month = now.getMonth();
    const day = now.getDate();


    /*
        AUGUST 30
    */

    if (month === 7 && day === 30) {

        setTimeout(() => {

            showPopup(
                "You noticed it."
            );

        }, 25000);

    }


    /*
        SEPTEMBER 1
    */

    if (month === 8 && day === 1) {

        setTimeout(() => {

            showPopup(
                "Halfway there."
            );

        }, 40000);

    }


    /*
        SEPTEMBER 5
    */

    if (month === 8 && day === 5) {

        setTimeout(() => {

            showPopup(
                "Tomorrow."
            );

        }, 30000);

    }


    /*
        LAUNCH DAY
    */

    if (month === 8 && day === 6) {

        setTimeout(() => {

            showPopup(
                "It's open now."
            );

        }, 15000);

    }

}

/* =========================
   RARE SEQUENCE
========================= */

function rareSequence() {

    const chance = Math.random();


    /*
        ONLY 8% CHANCE
    */

    if (chance > 0.08) return;


    setTimeout(() => {

        showPopup(
            "You came looking for a story."
        );

    }, 1000);


    setTimeout(() => {

        showPopup(
            "That's not always how stories begin."
        );

    }, 7000);


    setTimeout(() => {

        showPopup(
            "Sometimes..."
        );

    }, 14000);


    setTimeout(() => {

        showPopup(
            "The story finds you."
        );

    }, 20000);

}
showWelcomeBackMessage();

startMysteryMessages();

showDateBasedMessage();

rareSequence();

/* =========================
   INACTIVITY DETECTION
========================= */

let inactivityTimer;


function resetInactivityTimer() {

    clearTimeout(inactivityTimer);


    inactivityTimer = setTimeout(() => {

        showPopup(
            "You stopped moving."
        );

    }, 60000);

}


document.addEventListener(
    "mousemove",
    resetInactivityTimer
);

document.addEventListener(
    "scroll",
    resetInactivityTimer
);

document.addEventListener(
    "keydown",
    resetInactivityTimer
);


resetInactivityTimer();

/* =========================
   BOOK SECTION WATCHER
========================= */

const bookSection =
    document.getElementById("black-rose");

let bookVisits = 0;
let hasLeftBookSection = false;


const bookObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                if (hasLeftBookSection) {

                    bookVisits++;

                    reactToBookReturn();

                }

                hasLeftBookSection = true;

            }

        });

    },

    {
        threshold: 0.5
    }

);


bookObserver.observe(bookSection);


function reactToBookReturn() {

    if (bookVisits === 2) {

        setTimeout(() => {

            showPopup("Back again.");

        }, 4000);

    }


    if (bookVisits === 3) {

        setTimeout(() => {

            showPopup(
                "You really want to know what's behind that door."
            );

        }, 5000);

    }


    if (bookVisits === 4) {

        setTimeout(() => {

            showPopup(
                "Curiosity is a dangerous thing."
            );

        }, 4000);

    }

}

/* =========================
   TIME ON WEBSITE
========================= */

setTimeout(() => {

    showPopup(
        "Most people leave sooner."
    );

}, 180000);


setTimeout(() => {

    showPopup(
        "You're taking your time."
    );

}, 300000);


setTimeout(() => {

    showPopup(
        "I wonder what you're looking for."
    );

}, 480000);

/* =========================
   LOCKED BOOK WATCHER
========================= */

const bookButton =
    document.getElementById("wattpadBookBtn");

let buttonHoverTimer;
let buttonMessagesShown = 0;


bookButton.addEventListener("mouseenter", () => {

    if (
        bookButton.classList.contains("unlocked-btn")
    ) return;


    buttonHoverTimer = setTimeout(() => {

        if (buttonMessagesShown === 0) {

            showPopup("Not yet.");

        }

        else if (buttonMessagesShown === 1) {

            showPopup("You can wait.");

        }

        else if (buttonMessagesShown === 2) {

            showPopup(
                "The door is still locked."
            );

        }


        buttonMessagesShown++;

    }, 3000);

});


bookButton.addEventListener("mouseleave", () => {

    clearTimeout(buttonHoverTimer);

});

/* =========================
   STORY SECTION WATCHER
========================= */

const storiesSection =
    document.getElementById("stories");

let storyVisits = 0;
let storiesSeenBefore = false;


const storyObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                if (storiesSeenBefore) {

                    storyVisits++;

                    reactToStoryReturn();

                }

                storiesSeenBefore = true;

            }

        });

    },

    {
        threshold: 0.5
    }

);


storyObserver.observe(storiesSection);


function reactToStoryReturn() {

    if (storyVisits === 2) {

        setTimeout(() => {

            showPopup(
                "You read a lot."
            );

        }, 3000);

    }


    if (storyVisits === 3) {

        setTimeout(() => {

            showPopup(
                "Still looking for something?"
            );

        }, 4000);

    }


    if (storyVisits === 4) {

        setTimeout(() => {

            showPopup(
                "Or are you avoiding the one you're actually waiting for?"
            );

        }, 5000);

    }

}

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1200);

});

setTimeout(() => {

    document.getElementById(
        "loaderText"
    ).textContent = "access granted.";

}, 900);