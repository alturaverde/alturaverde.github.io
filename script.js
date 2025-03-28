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
