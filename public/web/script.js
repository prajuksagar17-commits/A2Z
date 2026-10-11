
/* =========================================================
   A2Z IT HUB - JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING LINK
   ========================================================= */

const navLinks = document.querySelectorAll(
    ".navbar .nav-link:not(.dropdown > .nav-link)"
);

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 900) {

            navbar.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   DROPDOWN MOBILE
   ========================================================= */

const dropdownLink = document.querySelector(
    ".dropdown > .nav-link"
);

const dropdown = document.querySelector(".dropdown");
const dropdownMenu = document.querySelector(".dropdown-menu");

if (dropdownLink && dropdownMenu) {

    dropdownLink.addEventListener("click", function (event) {

        if (window.innerWidth <= 900) {

            event.preventDefault();

            const currentDisplay =
                window.getComputedStyle(dropdownMenu).display;

            if (currentDisplay === "none") {
                dropdownMenu.style.display = "block";
            } else {
                dropdownMenu.style.display = "none";
            }

        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN WINDOW RESIZES
   ========================================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

        navbar.classList.remove("active");

        if (menuBtn) {

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

        if (dropdownMenu) {
            dropdownMenu.style.display = "";
        }

    }

});


/* =========================================================
   ENQUIRY MODAL
   ========================================================= */

const enquiryModal =
    document.getElementById("enquiryModal");


function openEnquiry(courseName = "") {

    if (!enquiryModal) {
        return;
    }

    enquiryModal.classList.add("active");

    document.body.style.overflow = "hidden";


    /* Automatically select course */

    if (courseName) {

        const courseSelect =
            document.getElementById("course");

        if (courseSelect) {

            const options =
                courseSelect.querySelectorAll("option");

            options.forEach(function (option) {

                if (
                    option.textContent
                    .toLowerCase()
                    .includes(courseName.toLowerCase())
                ) {

                    courseSelect.value =
                        option.value ||
                        option.textContent;

                }

            });

        }

    }

}


function closeEnquiry() {

    if (!enquiryModal) {
        return;
    }

    enquiryModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   ESC KEY CLOSE MODAL
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeEnquiry();

    }

});


/* =========================================================
   COURSE BUTTON
   ========================================================= */

function courseAlert(courseName) {

    openEnquiry(courseName);

}


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem =
            question.parentElement;

        const answer =
            faqItem.querySelector(".faq-answer");


        /* Close other FAQ items */

        document.querySelectorAll(".faq-item")
            .forEach(function (item) {

                if (item !== faqItem) {

                    item.classList.remove("active");

                    const otherAnswer =
                        item.querySelector(".faq-answer");

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }

                }

            });


        /* Open / Close current */

        faqItem.classList.toggle("active");

        if (faqItem.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});


/* =========================================================
   ENQUIRY FORM
   ========================================================= */

const enquiryForm =
    document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const mobile =
            document.getElementById("mobile").value.trim();

        const course =
            document.getElementById("course").value;

        const mode =
            document.getElementById("mode").value;


        /* Required fields */

        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            mobile === "" ||
            course === "" ||
            mode === ""
        ) {

            alert("Please fill all fields.");

            return;

        }


        /* Mobile validation */

        const mobilePattern =
            /^[6-9][0-9]{9}$/;

        if (!mobilePattern.test(mobile)) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return;

        }


        /* Email validation */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert(
                "Please enter a valid email address."
            );

            return;

        }


        /* Success */

        alert(
            "Thank you " +
            firstName +
            "! Your enquiry has been submitted successfully."
        );


        enquiryForm.reset();

        closeEnquiry();

    });

}


/* =========================================================
   ONLY ALLOW NUMBERS IN MOBILE FIELD
   ========================================================= */

const mobileInput =
    document.getElementById("mobile");

if (mobileInput) {

    mobileInput.addEventListener("input", function () {

        this.value =
            this.value.replace(/[^0-9]/g, "");

    });

}


/* =========================================================
   ACTIVE NAV LINK ON SCROLL
   ========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const mainNavLinks =
    document.querySelectorAll(
        '.navbar a[href^="#"]'
    );


window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    mainNavLinks.forEach(function (link) {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================================
   SCROLL ANIMATION
   ========================================================= */

const animationElements =
    document.querySelectorAll(
        ".course-card, .why-card, .quick-card, .job-card, .team-card, .blog-card, .step, .info-box, .batch-card"
    );


animationElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

});


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animationElements.forEach(function (element) {

    observer.observe(element);

});


/* =========================================================
   CLOSE MOBILE MENU WHEN NORMAL LINK IS CLICKED
   ========================================================= */

document.querySelectorAll(
    ".navbar a"
).forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 900) {

            navbar.classList.remove("active");

            if (menuBtn) {

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});


/* =========================================================
   PAGE LOADED
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "A2Z IT HUB Website Loaded Successfully!"
        );

    }
);
// =====================================================
// CERTIFICATE OTP
// =====================================================

document
    .getElementById("certificateForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("studentName").value.trim();

        const certificateNo =
            document.getElementById("certificateNo").value.trim();

        const mobile =
            document.getElementById("registeredMobile").value.trim();

        if (name === "" || certificateNo === "" || mobile === "") {
            alert("Please fill all details.");
            return;
        }

        if (mobile.length !== 10) {
            alert("Please enter a valid 10 digit mobile number.");
            return;
        }

        alert("OTP sent successfully!");

        document.getElementById("otpBox").style.display = "block";
    });


// =====================================================
// VERIFY CERTIFICATE
// =====================================================

function verifyCertificate() {

    const otp =
        document.getElementById("certificateOtp").value.trim();

    if (otp === "") {
        alert("Please enter OTP.");
        return;
    }

    alert("Certificate verification request submitted.");
}


// =====================================================
// OPEN CAMERA
// =====================================================

let certificateStream = null;

async function openCertificateCamera() {

    const cameraBox =
        document.getElementById("cameraBox");

    const video =
        document.getElementById("certificateCamera");

    try {

        certificateStream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment"
                }
            });

        video.srcObject = certificateStream;

        cameraBox.style.display = "block";

    } catch (error) {

        alert(
            "Camera permission denied or camera is not available."
        );
    }
}


// =====================================================
// CLOSE CAMERA
// =====================================================

function closeCertificateCamera() {

    const cameraBox =
        document.getElementById("cameraBox");

    const video =
        document.getElementById("certificateCamera");

    if (certificateStream) {

        certificateStream
            .getTracks()
            .forEach(track => track.stop());

        certificateStream = null;
    }

    video.srcObject = null;

    cameraBox.style.display = "none";
}

function playPlacementVideo(card) {

    alert("Placement success story video will play here.");
}



function loadMoreVideos() {

    alert("More placement videos will be loaded here.");
}
/* =========================
   FILTER JOBS
========================= */

function filterJobs() {

    const position =
        document.getElementById("positionFilter").value.toLowerCase();

    const area =
        document.getElementById("areaFilter").value.toLowerCase();

    const search =
        document.getElementById("searchInput").value.toLowerCase();

    const cards =
        document.querySelectorAll(".job-card");

    let count = 0;

    cards.forEach(card => {

        const cardPosition =
            card.dataset.position.toLowerCase();

        const cardArea =
            card.dataset.area.toLowerCase();

        const cardText =
            card.innerText.toLowerCase();

        const positionMatch =
            position === "" ||
            cardPosition === position;

        const areaMatch =
            area === "" ||
            cardArea === area;

        const searchMatch =
            search === "" ||
            cardText.includes(search);

        if (
            positionMatch &&
            areaMatch &&
            searchMatch
        ) {

            card.style.display = "flex";

            count++;

        } else {

            card.style.display = "none";

        }

    });

    document.getElementById("jobCount").innerText = count;
}


/* =========================
   RESET
========================= */

function resetJobs() {

    document.getElementById("positionFilter").value = "";

    document.getElementById("areaFilter").value = "";

    document.getElementById("searchInput").value = "";

    const cards =
        document.querySelectorAll(".job-card");

    cards.forEach(card => {

        card.style.display = "flex";

    });

    document.getElementById("jobCount").innerText =
        cards.length;
}


/* =========================
   APPLY
========================= */

function openApply(jobName) {

    document.getElementById("enquiryModal")
        .classList.add("show");

}


/* =========================
   ENQUIRY
========================= */

function openEnquiry() {

    document.getElementById("enquiryModal")
        .classList.add("show");

}


function closeEnquiry() {

    document.getElementById("enquiryModal")
        .classList.remove("show");

}


/* =========================
   NOTIFY JOB
========================= */

function notifyJob(event) {

    event.preventDefault();

    alert(
        "Thank you! You will be notified about matching job openings."
    );

    event.target.reset();
}


/* =========================
   ENQUIRY SUBMIT
========================= */

function submitEnquiry(event) {

    event.preventDefault();

    alert(
        "Thank you! Your enquiry has been submitted."
    );

    closeEnquiry();

    event.target.reset();
}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

document.getElementById("enquiryModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeEnquiry();

        }

    });