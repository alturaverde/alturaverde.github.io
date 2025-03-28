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
