document.addEventListener("DOMContentLoaded", function () {
    // Efecto de desplazamiento suave en los enlaces del menú
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

    // Efecto de aparición suave en secciones al hacer scroll
    const sections = document.querySelectorAll("#servicios, #galeria, #contacto");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Ampliar imagen en la galería al hacer clic
    const galleryImages = document.querySelectorAll(".gallery img");
    galleryImages.forEach(img => {
        img.addEventListener("click", function () {
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${this.src}" alt="Imagen ampliada"/>
                    <span class="close">&times;</span>
                </div>`;
            document.body.appendChild(modal);

            modal.querySelector(".close").addEventListener("click", () => {
                modal.remove();
            });
        });
    });

    // Inicializar slider
    initSliderSwipe("#slider");
});

// Validación del formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
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

        // Mostrar mensaje de éxito y ocultar el formulario
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.classList.add('fade-in');
        }

        this.style.display = 'none';
    });
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

// Inicialización del slider con swipe y botones
function initSliderSwipe(sliderSelector) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const btnPrev = slider.querySelector('.btn-prev');
    const btnNext = slider.querySelector('.btn-next');
    let startX = 0, currentTranslate = 0, prevTranslate = 0, isDragging = false;

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
    }

    btnPrev?.addEventListener('click', () => {
        currentTranslate += slider.offsetWidth;
        clampPosition();
        prevTranslate = currentTranslate;
        setPosition();
    });

    btnNext?.addEventListener('click', () => {
        currentTranslate -= slider.offsetWidth;
        clampPosition();
        prevTranslate = currentTranslate;
        setPosition();
    });

    track.addEventListener('mousedown', start);
    track.addEventListener('mousemove', move);
    track.addEventListener('mouseup', end);
    track.addEventListener('mouseleave', () => isDragging && end());
    track.addEventListener('touchstart', start);
    track.addEventListener('touchmove', move);
    track.addEventListener('touchend', end);

    track.style.cursor = 'grab';
}
