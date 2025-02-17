// Nom et Prénom: Dayan GANHOUEGNON
document.addEventListener('DOMContentLoaded', function () {
    // ✅ Navbar dynamique : Changement de couleur au scroll
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // ✅ Initialisation de Typed.js (Texte animé sur la page d'accueil)
    new Typed('#typed', {
        strings: [
            "Étudiant en Licence 3 Informatique Numérique",
            "Passionné par l'analyse et la visualisation de données",
            "À la recherche d'un stage de fin d'études"
        ],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
    });

    // ✅ Initialisation de Chart.js (Graphique des compétences)
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Python', 'Power BI', 'Matplotlib', 'Excel'],
            datasets: [{
                label: 'Compétences',
                data: [85, 70, 75, 90],
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#6c757d'],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
            },
            scales: {
                y: { beginAtZero: true },
            },
        },
    });

    // ✅ Effet de défilement fluide pour les liens du menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ✅ Initialisation de AOS (Animation on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
    });

    // ✅ Vérification du chargement d'EmailJS
    if (!emailjs) {
        console.error("❌ EmailJS n'a pas été chargé correctement. Vérifiez votre connexion internet.");
        return;
    }
    emailjs.init('i6B50yZbRvypxv08K'); // Remplace par ton vrai User ID EmailJS

    // ✅ Gestion du formulaire de contact
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Désactiver le bouton pour éviter les soumissions multiples
        submitButton.disabled = true;
        submitButton.textContent = "Envoi en cours...";

        // Envoi des données via EmailJS
        emailjs.sendForm('service_z5nexbz', 'template_2cmbftb', form)
            .then((response) => {
                console.log('✅ Email envoyé avec succès !', response.status, response.text);
                alert('Merci pour votre message ! Nous vous répondrons bientôt.');
                document.getElementById('confirmationMessage').style.display = 'block';
                form.reset();
            })
            .catch((error) => {
                console.error('❌ Échec de l’envoi', error);
                alert('Une erreur est survenue. Vérifiez votre connexion et réessayez.');
            })
            .finally(() => {
                // Réactivation du bouton après l'envoi
                submitButton.disabled = false;
                submitButton.textContent = "Envoyer";
            });
    });
});
