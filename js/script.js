// LÓGICA DEL CARRUSEL (ROLLER)
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const track = document.getElementById('sliderTrack');

function moveSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-play cada 7 segundos (7000ms)
let slideInterval = setInterval(() => moveSlide(1), 7000);

// Reiniciar temporizador si el usuario interactúa
function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => moveSlide(1), 7000);
}

document.querySelectorAll('.slider-btn').forEach(btn => {
    btn.addEventListener('click', resetTimer);
});

// DESPLIEGUE DINÁMICO (Scroll Suave)
document.querySelectorAll('.nav-links a, .hero-btns a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ENVÍO DE FORMULARIO
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        btn.innerText = "ENVIANDO...";
        btn.disabled = true;

        fetch('mail.php', {
            method: 'POST',
            body: new FormData(this)
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success') {
                alert("¡Mensaje enviado con éxito!");
                contactForm.reset();
            } else {
                alert("Hubo un error al enviar.");
            }
        })
        .catch(() => alert("Error de conexión."))
        .finally(() => {
            btn.innerText = "ENVIAR CONSULTA";
            btn.disabled = false;
        });
    });
}*/

// NUEVO ENVÍO CON EMAILJS
const formulario = document.getElementById('contacto-home');

if (formulario) {
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que la página se recargue

        const btn = document.getElementById('btn-enviar');
        btn.innerText = 'Enviando...';

        // Estos IDs los sacaste del Paso 1
        const serviceID = 'service_kea5ma9'; 
        const templateID = 'template_v42xr87';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.innerText = '¡Enviado!';
                alert('Mensaje enviado con éxito a Proyectos Gax. Nos contactaremos pronto.');
                formulario.reset(); // Limpia el formulario
            }, (err) => {
                btn.innerText = 'Error';
                alert('Hubo un error: ' + JSON.stringify(err));
            });
    });
}