const galleryModal = document.getElementById("galleryModal");
const galleryBackdrop = document.getElementById("galleryBackdrop");
const galleryClose = document.getElementById("galleryClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryImage = document.getElementById("galleryImage");
const galleryTitle = document.getElementById("galleryTitle");
const galleryLocation = document.getElementById("galleryLocation");
const galleryCounter = document.getElementById("galleryCounter");
const galleryThumbs = document.getElementById("galleryThumbs");
const cards = document.querySelectorAll(".realization-card");

let currentImages = [];
let currentIndex = 0;

function renderGallery() {
    if (!currentImages.length) return;

    galleryImage.src = currentImages[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

    galleryThumbs.innerHTML = "";

    currentImages.forEach((image, index) => {
        const thumb = document.createElement("button");
        thumb.className = `gallery-thumb ${index === currentIndex ? "active" : ""}`;
        thumb.type = "button";
        thumb.setAttribute("aria-label", `Zobrazit fotografii ${index + 1}`);

        thumb.innerHTML = `<img src="${image}" alt="Náhled fotografie realizace ${index + 1}">`;
        thumb.addEventListener("click", () => {
            currentIndex = index;
            renderGallery();
        });

        galleryThumbs.appendChild(thumb);
    });
}

function openGallery(card) {
    currentImages = card.dataset.images.split(",").map(img => img.trim());
    currentIndex = 0;

    galleryTitle.textContent = card.dataset.title || "Realizace";
    galleryLocation.textContent = card.dataset.location || "";

    renderGallery();
    galleryModal.classList.add("open");
    galleryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeGallery() {
    galleryModal.classList.remove("open");
    galleryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function showPrev() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    renderGallery();
}

function showNext() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    renderGallery();
}

cards.forEach(card => {
    card.addEventListener("click", () => openGallery(card));
    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openGallery(card);
        }
    });
});

galleryClose.addEventListener("click", closeGallery);
galleryBackdrop.addEventListener("click", closeGallery);
galleryPrev.addEventListener("click", showPrev);
galleryNext.addEventListener("click", showNext);

document.addEventListener("keydown", (e) => {
    if (!galleryModal.classList.contains("open")) return;

    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
});

/* jednoduchý swipe */
let touchStartX = 0;
let touchEndX = 0;

galleryImage.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

galleryImage.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) < 40) return;

    if (diff > 0) {
        showPrev();
    } else {
        showNext();
    }
});