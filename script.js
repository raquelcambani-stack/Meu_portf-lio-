// ==========================================
// 1. SELECIONAR ELEMENTOS DO HTML
// ==========================================

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
const sections = document.querySelectorAll("main section");


// ==========================================
// 2. CRIAR MENU PARA TELEMÓVEIS
// ==========================================

const menuButton = document.createElement("button");

menuButton.classList.add("menu-toggle");
menuButton.innerHTML = "☰";
menuButton.setAttribute("aria-label", "Abrir menu");
menuButton.setAttribute("aria-expanded", "false");

navbar.appendChild(menuButton);


// Criar estilos do menu móvel

const menuStyles = document.createElement("style");

menuStyles.textContent = `

    .menu-toggle {
        display: none;
        background: transparent;
        color: #D4AF37;
        border: none;
        font-size: 28px;
        cursor: pointer;
    }

    @media (max-width: 768px) {

        .navbar {
            flex-direction: row;
            flex-wrap: wrap;
        }

        .menu-toggle {
            display: block;
        }

        .nav-links {
            display: none;
            width: 100%;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
        }

        .nav-links.active {
            display: flex;
        }

    }

`;

document.head.appendChild(menuStyles);


// ==========================================
// 3. ABRIR E FECHAR MENU
// ==========================================

menuButton.addEventListener("click", function() {

    navLinks.classList.toggle("active");

    const menuAberto = navLinks.classList.contains("active");

    menuButton.innerHTML = menuAberto ? "✕" : "☰";

    menuButton.setAttribute(
        "aria-expanded",
        menuAberto
    );

});


// Fechar menu ao clicar num link

navLinks.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

        menuButton.innerHTML = "☰";

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// ==========================================
// 4. EFEITO NO CABEÇALHO
// ==========================================

window.addEventListener("scroll", function() {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 5px 20px rgba(0, 0, 0, 0.25)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


// ==========================================
// 5. ANIMAÇÃO DAS SECÇÕES
// ==========================================

// Criar estilos das animações

const animationStyles = document.createElement("style");

animationStyles.textContent = `

    .revelar {
        opacity: 0;
        transform: translateY(35px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .revelar.visivel {
        opacity: 1;
        transform: translateY(0);
    }

`;

document.head.appendChild(animationStyles);


// Observar quando as secções aparecem

const observador = new IntersectionObserver(

    function(entradas) {

        entradas.forEach(function(entrada) {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visivel");

            }

        });

    },

    {
        threshold: 0.15
    }

);


// Aplicar animação às secções

sections.forEach(function(section) {

    section.classList.add("revelar");

    observador.observe(section);

});


// ==========================================
// 6. DESTACAR SECÇÃO ATIVA NO MENU
// ==========================================

window.addEventListener("scroll", function() {

    let secaoAtual = "";

    sections.forEach(function(section) {

        const distanciaTopo = section.offsetTop - 150;

        if (window.scrollY >= distanciaTopo) {

            secaoAtual = section.getAttribute("id");

        }

    });


    navLinks.querySelectorAll("a").forEach(function(link) {

        link.classList.remove("ativo");

        if (link.getAttribute("href") === "#" + secaoAtual) {

            link.classList.add("ativo");

        }

    });

});


// Estilo do link ativo

const activeStyle = document.createElement("style");

activeStyle.textContent = `

    .nav-links a.ativo {
        color: #D4AF37;
        font-weight: 700;
    }

`;

document.head.appendChild(activeStyle);


// ==========================================
// 7. ANO AUTOMÁTICO NO RODAPÉ
// ==========================================

const footer = document.querySelector("footer");

if (footer) {

    const paragrafo = footer.querySelector("p");

    if (paragrafo) {

        paragrafo.innerHTML =
            `&copy; ${new Date().getFullYear()} Meu Portfólio. Todos os direitos reservados.`;

    }

}