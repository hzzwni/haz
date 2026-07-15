document.addEventListener("DOMContentLoaded", function () {
    
    // =======================================================
    // 1. LOGIK HAMBURGER & SIDEBAR MENU (MOBILE RESPONSIVE)
    // =======================================================
    const menuToggle = document.querySelector('.hamburger-toggle');
    const navButtons = document.querySelector('.nav-buttons');

    if (menuToggle && navButtons) {
        menuToggle.addEventListener('click', function () {
            // Pasang/buang kelas 'active' pada butang hamburger (untuk animasi X)
            this.classList.toggle('active');
            
            // Pasang/buang kelas 'active' pada menu (untuk kesan slide masuk/keluar)
            navButtons.classList.toggle('active');
        });
        
        // Tutup menu secara automatik jika pengguna klik mana-mana pautan menu di mobile
        const navLinks = navButtons.querySelectorAll('.btn-nav');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navButtons.classList.remove('active');
            });
        });
    }

    // =======================================================
    // 2. FUNGSI KLIK UNTUK MODAL PAPAR GAMBAR BUKTI
    // =======================================================
    const modal = document.getElementById('about-image-modal');
    const modalImg = document.getElementById('modal-target-img');
    const closeBtn = document.getElementById('modal-close-trigger');
    const clickableCards = document.querySelectorAll('.clickable-card');

    clickableCards.forEach(card => {
        // Paksa cursor bertukar jadi pointer (ikon tangan) sebagai petunjuk boleh klik
        card.style.cursor = 'pointer';

        card.addEventListener('click', function () {
            // Ambil laluan imej daripada atribut data-img
            let imgSrc = this.getAttribute('data-img');
            
            // Jika tiada data-img, cuba cari imej .window-img di dalam kad
            if (!imgSrc) {
                const imgInside = this.querySelector('.window-img');
                if (imgInside) imgSrc = imgInside.getAttribute('src');
            }

            console.log("Kad diklik! Laluan imej:", imgSrc);

            if (imgSrc && modal && modalImg) {
                modalImg.src = imgSrc;
                modal.style.display = "flex"; // Papar modal di tengah skrin
            }
        });
    });

    // Tutup modal apabila butang pangkah (X) modal diklik
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        });
    }

    // Tutup modal jika pengguna klik kawasan hitam di luar imej
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // =======================================================
    // 3. FUNGSI PENUKARAN TAB PANEL (01 - 04)
    // =======================================================
    const tabs = document.querySelectorAll('.tab-link');
    const panels = document.querySelectorAll('.about-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Buang kelas 'active' daripada semua butang tab dan panel kandungan
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Aktifkan tab yang diklik oleh pengguna
            this.classList.add('active');
            const targetTab = this.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetTab);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // =======================================================
    // 4. CONTACT FORM HANDLER (FORMSPREE FETCH)
    // =======================================================
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