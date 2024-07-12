const tapImage = document.getElementById('tapImage');
const shopButton = document.getElementById('shopButton');
const phrasesContainer = document.getElementById('phrasesContainer');
const status = document.getElementById('status');
const energyBar = document.getElementById('energyBar');
const shopModal = document.getElementById('shopModal');
const tapStatusMessage = document.getElementById('tapStatusMessage');
const shopItem = document.getElementById('shopItem');
const watchVideoButton = document.getElementById('watchVideoButton');
const claimRewardButton = document.getElementById('claimReward');
const energyWarning = document.getElementById('energyWarning');
const noTasksMessage = document.getElementById('noTasksMessage');
const taskContainer = document.getElementById('taskContainer');

let points = 0;
let pointsPerTap = 1;
let energy = 500;
let maxEnergy = 500;
let upgradeCost = 100;
let videoWatched = false;

const phrases = ["+1", "+!", ""];
const statusMessages = [
    { points: 0, message: "Ну чтоб руки не дрожали" },
    { points: 100, message: "Чтоб работа спорилась" },
    { points: 500, message: "Хорошо пошла" },
    { points: 1000, message: "За моряков" },
    { points: 10000, message: "За советских дворников" },
    { points: 100000, message: "Вань, автокликер офни" },
    { points: 1000000, message: "...." },
    { points: 10000000, message: "Ладно" },
    { points: 100000000, message: "Этой надписи никто не увидит" }
];

const images = [
    { points: 0, src: 'https://i.imgur.com/0x4f5yq.png' },
    { points: 50, src: 'https://i.imgur.com/Mk04Ndx.png' },
    { points: 100, src: 'https://i.imgur.com/WX3AuUA.png' },
    { points: 150, src: 'https://i.imgur.com/zbs8nxS.png' },
    
    // Add more images as needed
    // Add more images as needed
];

function updateStatus() {
    status.innerText = `Points: ${points} $BVK`;
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
    energyBar.innerText = `Energy: ${energy}/${maxEnergy}`;
    
    const statusMessage = statusMessages.find(sm => points >= sm.points);
    tapStatusMessage.innerText = statusMessage ? statusMessage.message : "Keep tapping!";
    
    const image = images.find(img => points >= img.points);
    if (image) {
        tapImage.src = image.src;
    }
}

function showPhrase(text, x, y) {
    const phraseElement = document.createElement('div');
    phraseElement.className = 'phrase';
    phraseElement.innerText = text;
    phrasesContainer.appendChild(phraseElement);

    const rect = tapImage.getBoundingClientRect();
    phraseElement.style.left = `${320}px`;
    phraseElement.style.top = `${y - rect.top}px`;

    const randomAngle = (Math.random() - 0.5) * 2 * 45;
    const randomDistance = Math.random() * 50 + 50;
    phraseElement.style.transform = `translate(-50%, -50%) rotate(${randomAngle}deg) translateY(-${randomDistance}px)`;

    setTimeout(() => {
        phrasesContainer.removeChild(phraseElement);
    }, 1000);
}

tapImage.addEventListener('click', (e) => {
    if (energy > 0) {
        points += pointsPerTap;
        energy--;
        updateStatus();

        // Animate the tap image
        tapImage.classList.add('tapped');
        setTimeout(() => {
            tapImage.classList.remove('tapped');
        }, 200);
        
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        showPhrase(randomPhrase, e.clientX, e.clientY);
    } else {
        showPhrase("No energy left", e.clientX, e.clientY);
    }
});

function openTab(tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
    
    if (tabName === "tasks" && !videoWatched) {
        noTasksMessage.style.display = "none";
        watchVideoButton.style.display = "block";
        claimRewardButton.style.display = "none";
    }
}

function openShop() {
    shopModal.style.display = "block";
}

function closeShop() {
    shopModal.style.display = "none";
}

function buyUpgrade() {
    if (points >= upgradeCost) {
        points -= upgradeCost;
        pointsPerTap += 2;
        upgradeCost *= 2;
        shopItem.innerText = `Buy Upgrade (+2 points per tap) - Cost: ${upgradeCost} $BVK`;
        updateStatus();
    }
}

function completeTask(taskName, url) {
    window.open(url, '_blank');
    setTimeout(() => {
        watchVideoButton.style.display = "none";
        claimRewardButton.style.display = "block";
    }, 10000);
}

function claimReward() {
    points += 100;
    videoWatched = true;
    updateStatus();
    claimRewardButton.style.display = "none";
    noTasksMessage.style.display = "block";
}

function generateReferralLink() {
    const referralLink = `${window.location.href}?ref=${generateRandomString()}`;
    const referralLinkElement = document.getElementById('referralLink');
    referralLinkElement.innerText = `Your referral link: ${https://t.me/MDRFcoinbot/MDRFcoin}`;
}

function generateRandomString() {
    return Math.random().toString(36).substr(2, 9);
}

// Initialize the tap tab
openTab('tap');
updateStatus();
