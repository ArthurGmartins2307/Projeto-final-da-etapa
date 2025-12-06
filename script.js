document.addEventListener("DOMContentLoaded", () => {
    const cidadeInput = document.getElementById("cidadeInput");
    const modalidadeSelect = document.getElementById("modalidadeSelect");
    const buscarBtn = document.getElementById("buscarGPS");
    const resultadosDiv = document.getElementById("lista-campeonatos");

    const academias = [
        { nome: "Target fitclub - Alto da Mooca", cidade: "São Paulo", modalidade: "academia", endereco: "R. da Mooca, 2868 - Alto da Mooca" },
        { nome: "Fight Team Mooca", cidade: "São Paulo", modalidade: "boxe", endereco: "Rua Conde Prates, 264 - 2° andar - Parque da Mooca" },
        { nome: "CNBOX Belenzinho", cidade: "São Paulo", modalidade: "boxe", endereco: "R. Serra de Jairé, 679 - Quarta Parada" },
        { nome: "Academia Smart Fit", cidade: "São Paulo", modalidade: "academia", endereco: "Av. Cassandoca, 939 - Belenzinho" },
        { nome: "Nova União - Mooca", cidade: "São Paulo", modalidade: "jiu jitsu", endereco: "R. do Oratório, 804 - Mooca" },
        { nome: "Alliance Jiu Jitsu | Anália Franco", cidade: "São Paulo", modalidade: "jiu jitsu", endereco: "R. Arariba, 58 - Vila Reg. Feijó" },
        { nome: "Squadrao thai brasil", cidade: "São Paulo", modalidade: "muay thai", endereco: "R. Padre Raposo, 837 - Alto da Mooca" },
        { nome: "Maximum Arena", cidade: "São Paulo", modalidade: "muay thai", endereco: "Rua Siqueira Bueno, 1455 - Belenzinho" }
    ];

    function buscarAcademias() {
        const cidade = cidadeInput.value.trim().toLowerCase();
        const modalidade = modalidadeSelect.value.trim().toLowerCase();

        const filtrados = academias.filter(a => {
            const matchCidade = a.cidade.toLowerCase().includes(cidade);
            const matchModalidade = modalidade === "" || a.modalidade === modalidade;
            return matchCidade && matchModalidade;
        });

        exibirResultados(filtrados);
    }

    function exibirResultados(lista) {
        resultadosDiv.innerHTML = "";

        if (lista.length === 0) {
            resultadosDiv.innerHTML = `
                <p class="no-results">❌ Nenhuma academia encontrada</p>
            `;
            return;
        }

        lista.forEach((a, index) => {
            const card = document.createElement("div");
            card.classList.add("academia-card");

            // Animação suave de entrada
            card.style.animation = `fadeIn 0.4s ease forwards`;
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <h3>${a.nome}</h3>
                <p class="detail"><span>📍</span> Cidade: ${a.cidade}</p>
                <p class="detail"><span>🔥</span> Modalidade: ${a.modalidade}</p>
                <p class="detail"><span>🏠</span> Endereço: ${a.endereco}</p>
            `;

            resultadosDiv.appendChild(card);
        });
    }

    buscarBtn.addEventListener("click", buscarAcademias);
});

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const navLinks = nav.querySelectorAll('a');
const menuIcon = menuToggle.querySelector('i');

// Abrir/fechar menu e alternar ícone
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');

    if(nav.classList.contains('open')) {
        menuIcon.classList.remove('bi-list');
        menuIcon.classList.add('bi-x');
    } else {
        menuIcon.classList.remove('bi-x');
        menuIcon.classList.add('bi-list');
    }
});

// Fecha menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuIcon.classList.remove('bi-x');
        menuIcon.classList.add('bi-list');
    });
});

// Fecha menu ao clicar fora
document.addEventListener('click', (e) => {
    if(!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        menuIcon.classList.remove('bi-x');
        menuIcon.classList.add('bi-list');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    const navLinks = nav.querySelectorAll('a');
    const menuIcon = menuToggle.querySelector('i');

    // Abrir/fechar menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuIcon.classList.toggle('bi-list');
        menuIcon.classList.toggle('bi-x');
    });

    // Fechar ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuIcon.classList.add('bi-list');
            menuIcon.classList.remove('bi-x');
        });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('open');
            menuIcon.classList.add('bi-list');
            menuIcon.classList.remove('bi-x');
        }
    });
});
