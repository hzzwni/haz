// =================================================================
// FAIL: js/myportfolio.js (Hanya untuk myportfolio.html)
// =================================================================

// 1. KAWALAN PERTUKARAN TAB (Designs / Photography / Trends)
function bukaTab(evt, namaSeksyen) {
    var i, gallerySections, tabLinks;
    
    // Sembunyikan semua seksyen portfolio
    gallerySections = document.getElementsByClassName("gallery-section");
    for (i = 0; i < gallerySections.length; i++) {
        gallerySections[i].classList.remove("active-section");
    }

    // Buang kelas 'active' daripada semua pautan navigasi tab
    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Tampilkan seksyen yang dipilih & tandakan tab sebagai aktif
    var seksyenSasaran = document.getElementById(namaSeksyen);
    if (seksyenSasaran) {
        seksyenSasaran.classList.add("active-section");
    }
    
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}

// 2. KAWALAN PEMBESARAN GAMBAR (Lightbox Modal)
function besarkanGambar(element) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("imgExpanded");
    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = element.src;
    }
}

// 3. KAWALAN TUTUP GAMBAR
function tutupGambar() {
    var modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// 4. LOGIK AUTO-KLIK BERDASARKAN HASH (#) URL
function semakHashURL() {
    var hash = window.location.hash.substring(1).toLowerCase(); 
    
    if (hash) {
        var semuaTab = document.getElementsByClassName("tab-link");
        
        for (var i = 0; i < semuaTab.length; i++) {
            var fungsiOnclick = semuaTab[i].getAttribute("onclick");
            
            // Semak jika onclick mengandungi nama hash (e.g. 'photography')
            if (fungsiOnclick && fungsiOnclick.toLowerCase().includes("'" + hash + "'")) {
                
                // Sediakan object event olok-olok untuk fungsi bukaTab
                var mockEvent = { currentTarget: semuaTab[i] };
                
                // Buka tab berkenaan secara direct
                bukaTab(mockEvent, hash);
                break;
            }
        }
    }
}

// Jalankan check bila halaman portfolio siap di-load
window.addEventListener("DOMContentLoaded", semakHashURL);
// Jalankan check juga jika user tukar klik hash semasa dalam page yang sama
window.addEventListener("hashchange", semakHashURL);

// 5. KAWALAN HAMBURGER MENU (UNTUK TELEFON - SAFETY NET BACKUP)
function toggleMenu() {
    // Cari id "navMenu", kalau tiada, automatik cari class ".nav-buttons" (ikut CSS kau)
    var menu = document.getElementById("navMenu") || document.querySelector(".nav-buttons");
    var hamburger = document.querySelector(".hamburger-toggle");
    
    // Alih fungsi kelas 'active' untuk tunjuk/sorok menu sidebar
    if (menu) {
        menu.classList.toggle("active");
    }
    
    // Alih fungsi kelas 'active' pada butang hamburger untuk animasi pangkah (X)
    if (hamburger) {
        hamburger.classList.toggle("active");
    }
}

// =======================================================
// CONTACT FORM HANDLER (FORMSPREE FETCH)
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

