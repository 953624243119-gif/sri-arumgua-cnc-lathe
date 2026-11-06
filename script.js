
// =================================
// SRI ARUMUGA WOOD - JAVASCRIPT
// =================================


// 1. MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    menuBtn.textContent =
        navLinks.classList.contains("open") ? "✕" : "☰";

});

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";

    });

});


// 2. DARK MODE

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeBtn.textContent = isDark ? "☀" : "☾";

    localStorage.setItem("woodTheme", isDark ? "dark" : "light");

});

// Restore saved theme

if (localStorage.getItem("woodTheme") === "dark") {

    document.body.classList.add("dark");
    themeBtn.textContent = "☀";

}


// 3. ENQUIRY POPUP

const enquiryModal = document.getElementById("enquiryModal");

function openEnquiry() {

    enquiryModal.classList.add("show");

}

function closeEnquiry() {

    enquiryModal.classList.remove("show");

}

function enquireProduct(productName) {

    openEnquiry();

    document.getElementById("mProduct").value = productName;

}


// Close popup outside the box

enquiryModal.addEventListener("click", (event) => {

    if (event.target === enquiryModal) {

        closeEnquiry();

    }

});


// Close popup with Escape key

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeEnquiry();

    }

});


// 4. PRODUCT SEARCH AND FILTER

const searchInput = document.getElementById("searchInput");

const productCards = document.querySelectorAll(".product-card");

const filterButtons = document.querySelectorAll(".filter-btn");

let selectedCategory = "all";


function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    let visibleCount = 0;

    productCards.forEach(card => {

        const category = card.dataset.category;

        const productName =
            card.querySelector("h3").textContent.toLowerCase();

        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;

        const searchMatch =
            productName.includes(searchText);

        if (categoryMatch && searchMatch) {

            card.style.display = "block";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    // No results message

    let emptyMessage = document.getElementById("emptyMessage");

    if (visibleCount === 0) {

        if (!emptyMessage) {

            emptyMessage = document.createElement("p");

            emptyMessage.id = "emptyMessage";

            emptyMessage.className = "no-results";

            emptyMessage.textContent =
                "No designs found. Try another search.";

            document.getElementById("productContainer")
                .appendChild(emptyMessage);

        }

    } else if (emptyMessage) {

        emptyMessage.remove();

    }

}


// Filter button events

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.filter;

        filterProducts();

    });

});


// Search event

searchInput.addEventListener("input", filterProducts);


// 5. WHATSAPP ENQUIRY FUNCTION

// Replace this with your actual WhatsApp business number.
// Include country code without + sign.

const BUSINESS_NUMBER = "919876543210";


function sendWhatsApp(message) {

    if (BUSINESS_NUMBER === "919876543210") {

        showToast("Update your WhatsApp business number in script.js");

        return;

    }

    const url =
        "https://wa.me/" +
        BUSINESS_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");

}


// 6. CONTACT FORM

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("cName").value.trim();

    const email = document.getElementById("cEmail").value.trim();

    const phone = document.getElementById("cPhone").value.trim();

    const service = document.getElementById("cService").value;

    const message = document.getElementById("cMessage").value.trim();


    const whatsappMessage = `
Hello Sri Arumuga Wood!

New Customer Enquiry

Name: ${name}

Email: ${email}

Phone: ${phone}

Service: ${service}

Message: ${message}
    `;

    sendWhatsApp(whatsappMessage);

});


// 7. POPUP ENQUIRY FORM

const modalForm = document.getElementById("modalForm");

modalForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("mName").value.trim();

    const phone = document.getElementById("mPhone").value.trim();

    const product = document.getElementById("mProduct").value.trim();

    const message = document.getElementById("mMessage").value.trim();


    const whatsappMessage = `
Hello Sri Arumuga Wood!

Project Enquiry

Name: ${name}

Phone: ${phone}

Product: ${product}

Project Details: ${message}
    `;

    sendWhatsApp(whatsappMessage);

    closeEnquiry();

});


// 8. TOAST NOTIFICATION

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.style.display = "none";

    }, 3500);

}


// 9. GALLERY IMAGE PREVIEW

const galleryImages =
    document.querySelectorAll(".gallery-container img");


galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        const preview = document.createElement("div");

        preview.style.cssText = `
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.95);
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:5000;
            padding:25px;
            cursor:zoom-out;
        `;

        const largeImage = document.createElement("img");

        largeImage.src = image.src;

        largeImage.alt = image.alt;

        largeImage.style.cssText = `
            max-width:90%;
            max-height:85vh;
            object-fit:contain;
            border-radius:10px;
        `;

        preview.appendChild(largeImage);

        document.body.appendChild(preview);

        preview.addEventListener("click", () => {

            preview.remove();

        });

    });

});


// 10. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(
    ".service-card, .product-card, .about-content, .about-image"
);


const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition = "all 0.7s ease";

    revealObserver.observe(element);

});


// 11. BACK TO TOP

const backToTop = document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});


function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// 12. PAGE LOADED

window.addEventListener("load", () => {

    console.log("Sri Arumuga Wood Website Loaded Successfully!");

});
