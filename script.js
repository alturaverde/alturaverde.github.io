document.addEventListener("DOMContentLoaded", function () {
    // Desplazamiento suave al hacer clic en el menú
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Animación de aparición con IntersectionObserver
    const sections = document.querySelectorAll("#servicios, #galeria, #contacto");
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.2 });
        sections.forEach(section => observer.observe(section));
    } else {
        sections.forEach(section => section.classList.add("visible"));
    }

    // Modal en galería
    const galleryImages = document.querySelectorAll(".gallery img");
    galleryImages.forEach(img => {
        img.addEventListener("click", function () {
            if (document.querySelector(".modal")) return;

            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${this.src}" alt="Imagen ampliada"/>
                    <span class="close">&times;</span>
                </div>`;
            document.body.appendChild(modal);

            modal.querySelector(".close").addEventListener("click", () => modal.remove());
        });
    });

    // Cerrar modal con Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            const modal = document.querySelector(".modal");
            if (modal) modal.remove();
        }
    });

    // Validación del formulario
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre || !email || !mensaje) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Por favor, ingresa un correo válido.");
                return;
            }

            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.classList.add('fade-in');
            }

            this.reset();
            this.style.display = 'none';
        });
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    // Inicialización del slider con botones, swipe y autoplay
    initSliderSwipe("#slider");
});

function initSliderSwipe(sliderSelector) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const btnPrev = slider.querySelector('.btn-prev');
    const btnNext = slider.querySelector('.btn-next');

    let startX = 0, currentTranslate = 0, prevTranslate = 0;
    let isDragging = false;
    let autoplayInterval = null;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    function setPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function clampPosition() {
        const maxTranslate = 0;
        const minTranslate = -track.scrollWidth + slider.offsetWidth;
        if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
        if (currentTranslate < minTranslate) currentTranslate = minTranslate;
    }

    function start(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        track.style.cursor = 'grabbing';
        stopAutoplay();
    }

    function move(e) {
        if (!isDragging) return;
        const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentTranslate = prevTranslate + x - startX;
        clampPosition();
        setPosition();
    }

    function end() {
        isDragging = false;
        prevTranslate = currentTranslate;
        track.style.cursor = 'grab';
        startAutoplay();
    }

    function slideNext() {
        currentTranslate -= slider.offsetWidth;
        clampPosition();
        prevTranslate = currentTranslate;
        setPosition();
    }

    function slidePrev() {
        currentTranslate += slider.offsetWidth;
        clampPosition();
        prevTranslate = currentTranslate;
        setPosition();
    }

    btnNext?.addEventListener('click', slideNext);
    btnPrev?.addEventListener('click', slidePrev);

    if (isMobile) {
        track.addEventListener('touchstart', start);
        track.addEventListener('touchmove', move);
        track.addEventListener('touchend', end);
    } else {
        track.addEventListener('mousedown', start);
        track.addEventListener('mousemove', move);
        track.addEventListener('mouseup', end);
        track.addEventListener('mouseleave', () => isDragging && end());
    }

    track.style.cursor = 'grab';

    function startAutoplay() {
        autoplayInterval = setInterval(slideNext, 5000); // cada 5 segundos
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    startAutoplay();
}
