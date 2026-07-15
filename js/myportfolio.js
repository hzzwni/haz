// =======================================================
// 1. LOGIK HAMBURGER & SIDEBAR MENU (GLOBAL FUNCTION)
// =======================================================
function toggleMenu() {
    const menuToggle = document.querySelector('.hamburger-toggle');
    const navButtons = document.getElementById('navMenu'); // Menggunakan ID navMenu dari HTML

    if (menuToggle && navButtons) {
        // Pasang/buang kelas 'active' pada butang hamburger (untuk animasi X)
        menuToggle.classList.toggle('active');
        
        // Pasang/buang kelas 'active' pada laci menu untuk meluncur masuk/keluar
        navButtons.classList.toggle('active');
    }
}

// Auto-tutup menu mobile apabila pengguna klik mana-mana pautan di dalam sidebar
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.hamburger-toggle');
    const navButtons = document.getElementById('navMenu');

    if (navButtons && menuToggle) {
        const navLinks = navButtons.querySelectorAll('.btn-nav');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navButtons.classList.remove('active');
            });
        });
    }
});

// =======================================================
// 2. FUNGSI PENUKARAN TAB PANEL (GALLERY SECTIONS)
// =======================================================
function bukaTab(evt, namaSeksyen) {
    // 1. Sembunyikan semua seksyen portfolio
    var i, gallerySections, tabLinks;
    gallerySections = document.getElementsByClassName("gallery-section");
    for (i = 0; i < gallerySections.length; i++) {
        gallerySections[i].classList.remove("active-section");
    }

	
    // 2. Buang kelas 'active' daripada semua pautan tab
    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // 3. Paparkan seksyen semasa dan tambah kelas 'active' pada tab yang ditekan
    const targetSeksyen = document.getElementById(namaSeksyen);
    if (targetSeksyen) {
        targetSeksyen.classList.add("active-section");
    }
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}

// =======================================================
// 3. FUNGSI BESARKAN & POPUP GAMBAR MODAL
// =======================================================
// Fungsi untuk besarkan gambar semasa ditekan
function besarkanGambar(element) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("imgExpanded");
    
    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = element.src; // Mengambil sumber gambar yang ditekan
    }
}

// Fungsi untuk tutup modal gambar dengan perlindungan anti-terklik gambar
function tutupGambar(evt) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("imgExpanded");
    
    // Modal hanya akan tutup jika klik di luar kawasan gambar utama (latar belakang hitam)
    if (modal && evt.target !== modalImg) {
        modal.style.display = "none";
    }
}

// =======================================================
// 4. CONTACT FORM HANDLER (FORMSPREE FETCH)
// =======================================================
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("my-contact-form");
    const status = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    // Pastikan form wujud dalam page sebelum jalankan skrip
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Halang page daripada reload
            
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            const data = new FormData(form);
            
            fetch("https://formspree.io/f/xzdnbyzo", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "Thanks! Your message has been sent successfully. ✨";
                    status.style.color = "#4ade80"; // Hijau soft
                    form.reset();
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form.";
                    status.style.color = "#f87171"; // Merah soft
                }
                submitBtn.innerText = "Send";
                submitBtn.disabled = false;
            }).catch(error => {
                status.innerHTML = "Oops! Something went wrong. Please try again.";
                status.style.color = "#f87171";
                submitBtn.innerText = "Send";
                submitBtn.disabled = false;
            });
        });
    }
});





// Dapatkan elemen button
const scrollTopBtn = document.getElementById("scrollToTopBtn");

// Bila user scroll skrin, jalankan fungsi ini
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    // Jika scroll lebih daripada 300px dari atas, tunjuk button. Jika tidak, sorok.
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

// Bila user klik button, skrin akan scroll ke atas secara lancar (smooth)
scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



document.addEventListener("DOMContentLoaded", function() {
    // Aktifkan fungsi lightbox untuk semua link dengan class 'gallery-item'
    var lightbox = new SimpleLightbox('.gallery-item', { 
        // Anda boleh tambah options di sini jika perlu
        captionDelay: 250,
        enableKeyboard: true
    });
});