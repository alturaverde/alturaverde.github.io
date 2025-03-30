document.addEventListener("DOMContentLoaded", function () {
    // Agregar efecto de desplazamiento suave a los enlaces del menú
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Agregar efecto de carga suave a las secciones al hacer scroll
    const sections = document.querySelectorAll("#servicios, #galeria, #contacto");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Ampliar imagen al hacer clic en la galería
    const galleryImages = document.querySelectorAll(".gallery img");
    galleryImages.forEach(img => {
        img.addEventListener("click", function () {
            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `<div class="modal-content"><img src="${this.src}"/><span class="close">&times;</span></div>`;
            document.body.appendChild(modal);
            
            modal.querySelector(".close").addEventListener("click", () => {
                modal.remove();
            });
        });
    });
});
document.getElementById('contactForm').addEventListener('submit', function(event) {
const nombre = document.getElementById('nombre').value;
const email = document.getElementById('email').value;
const mensaje = document.getElementById('mensaje').value;

if (!nombre || !email || !mensaje) {
    alert("Por favor, completa todos los campos.");
    return;
}

if (!validateEmail(email)) {
    alert("Por favor, ingresa un correo válido.");
    return;
}

// Función para validar el formato del email
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

    event.preventDefault(); // Prevenir la acción predeterminada (no recargar página)

    const form = this;
    const successMessage = document.getElementById('successMessage');

    // Mostrar mensaje de éxito
    successMessage.style.display = 'block';
    
    // Ocultar el formulario
    form.style.display = 'none';

    // Aquí podemos también añadir una animación para que sea más suave
    successMessage.classList.add('fade-in');
});
<script>
    const sliderTrack = document.querySelector('.slider-track');
    let startX = 0, currentTranslate = 0, prevTranslate = 0, animationID, isDragging = false;

    function setPosition() {
        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    function touchStart(e) {
        isDragging = true;
        startX = e.touches[0].clientX;
    }

    function touchMove(e) {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentX - startX;
        setPosition();
    }

    function touchEnd() {
        isDragging = false;
        const slideWidth = sliderTrack.offsetWidth / sliderTrack.children.length;
        const moved = currentTranslate - prevTranslate;
        if (moved < -50) {
            nextSlide();
        } else if (moved > 50) {
            prevSlide();
        } else {
            currentTranslate = prevTranslate;
            setPosition();
        }
    }

    function nextSlide() {
        const slideWidth = sliderTrack.offsetWidth / sliderTrack.children.length;
        if (prevTranslate > -slideWidth * (sliderTrack.children.length - 1)) {
            prevTranslate -= slideWidth;
            currentTranslate = prevTranslate;
            setPosition();
        }
    }

    function prevSlide() {
        const slideWidth = sliderTrack.offsetWidth / sliderTrack.children.length;
        if (prevTranslate < 0) {
            prevTranslate += slideWidth;
            currentTranslate = prevTranslate;
            setPosition();
        }
    }

    sliderTrack.addEventListener('touchstart', touchStart);
    sliderTrack.addEventListener('touchmove', touchMove);
    sliderTrack.addEventListener('touchend', touchEnd);
</script>
function initSliderSwipe(sliderSelector) {
    const sliderTrack = document.querySelector(`${sliderSelector} .slider-track`);
    if (!sliderTrack) return;

    let startX = 0, currentTranslate = 0, prevTranslate = 0, isDragging = false;

    function setPosition() {
        sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    function touchStart(e) {
        isDragging = true;
        startX = e.touches[0].clientX;
    }

    function touchMove(e) {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentX - startX;
        setPosition();
    }

    function touchEnd() {
        isDragging = false;
        const slideWidth = sliderTrack.offsetWidth / sliderTrack.children.length;
        const moved = currentTranslate - prevTranslate;
        if (moved < -50) {
            nextSlide();
        } else if (moved > 50) {
            prevSlide();
        } else {
            currentTranslate = prevTranslate;
            setPosition();
        }
    }

    function nextSlide() {
        const slideWidth = sliderTrack.offsetWidth / sliderTrack.children.length;
        if (prevTranslate > -slideWidth * (sliderTrack.children.length - 1)) {
            prevTranslate -= slideWidth;
            currentTranslate = prevTranslate;
            setPosition();
        }
    }

    function prevSlide() {
        const slideWidth = sliderTrack.offsetWidth / sliderTrack.children.length;
        if (prevTranslate < 0) {
            prevTranslate += slideWidth;
            currentTranslate = prevTranslate;
            setPosition();
        }
    }

    sliderTrack.addEventListener('touchstart', touchStart);
    sliderTrack.addEventListener('touchmove', touchMove);
    sliderTrack.addEventListener('touchend', touchEnd);
}

document.addEventListener('DOMContentLoaded', () => {
    initSliderSwipe('#slider');  // <--- aquí indicás el ID del slider que quieras controlar
});
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

    // --- SWIPE & DRAG HANDLERS ---
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

    // --- BUTTONS ---
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

    // --- EVENT LISTENERS ---
    track.addEventListener('mousedown', start);
    track.addEventListener('mousemove', move);
    track.addEventListener('mouseup', end);
    track.addEventListener('mouseleave', () => isDragging && end());

    track.addEventListener('touchstart', start);
    track.addEventListener('touchmove', move);
    track.addEventListener('touchend', end);

    // --- INITIAL STATE ---
    track.style.cursor = 'grab';
}

document.addEventListener('DOMContentLoaded', () => {
    initSliderSwipe('#slider');
});
