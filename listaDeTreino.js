const procurar = document.getElementById('procurarTreino');
const treinoInput = document.getElementById('treino');
const listaProcurados = document.getElementById('procurados');
const areaTreino = document.getElementById('treino2');

// Lista de exercícios
const exercicios = [
    { nome: 'Supino Inclinado', descricao: 'Deite no banco inclinado, segure a barra, abaixe até o peito e empurre de volta', series: '3 séries de 10 repetições', observacao: 'Peso: Moderado', imagem: './img/supino.png', video: 'https://youtube.com/shorts/NrurrUZ9bfw?si=lxbkKnMSPIyEiP7l' },
    { nome: 'Agachamento Livre', descricao: 'Fique em pé com os pés na largura dos ombros, agache e retorne', series: '4 séries de 12 repetições', observacao: 'Peso: Leve a Moderado', imagem: './img/agachamento.png', video: 'https://youtube.com/shorts/8V2SwkHTLek?si=LeS0jGNWqUOoJT-P' },
    { nome: 'Peck Deck', descricao: 'Sente-se na máquina e junte os braços à frente do peito', series: '3 séries de 12-15', observacao: 'Peso: Leve a Moderado', imagem: './img/peck-deck.png', video: 'https://youtube.com/shorts/rOrr4kSwQpE?si=JmpAGKgH7b3e3dot' },
    { nome: 'Desenvolvimento com Halteres', descricao: 'Empurre halteres acima da cabeça sentado', series: '3 séries de 10-12', observacao: 'Peso: Moderado', imagem: './img/desenvolvimento.png', video: 'https://youtube.com/shorts/Wywt3mN-6RA?si=OVi7fczoJfgBDwle' },
    { nome: 'Levantamento Terra', descricao: 'Levante a barra mantendo postura correta', series: '4 séries de 6-8', observacao: 'Peso: Pesado', imagem: './img/terra.png', video: 'https://youtube.com/shorts/oSaXuwqLpWc?si=jZjfumXlELBCZCmJ' },
    { nome: 'Barra Fixa', descricao: 'Puxe o corpo até o queixo ultrapassar a barra', series: '3 séries de 8-10', observacao: 'Peso corporal', imagem: './img/barra.png', video: 'https://youtube.com/shorts/BYYxtz9MtDc?si=G9_F307teGa4smK8' },
    { nome: 'Flexão de Braço', descricao: 'Empurre o corpo para cima com as mãos no chão', series: '4 séries de 12-15', observacao: 'Peso corporal', imagem: './img/flexao.png', video: 'https://youtube.com/shorts/pRzxpe5_LLk?si=BHjJ6aWQ-tfgd-1w' },
    { nome: 'Abdominal', descricao: 'Eleve o tronco em direção aos joelhos', series: '3 séries de 15-20', observacao: 'Peso corporal', imagem: './img/abdominal.png', video: 'https://youtube.com/shorts/kiqKO0tTFVw?si=XryMhiVBmkr12nJC' },
    { nome: 'Prancha', descricao: 'Mantenha o corpo reto apoiado nos antebraços', series: '3 séries de 30-60s', observacao: 'Peso corporal', imagem: './img/prancha.png', video: 'https://youtube.com/shorts/jZY0XzzXleI?si=9CLTzjWM7PD0jkky' },
    { nome: 'Pull-Over com Halteres', descricao: 'Abaixe o haltere atrás da cabeça e retorne', series: '3 séries de 10-12', observacao: 'Peso moderado', imagem: './img/pull-over.png', video: 'https://youtube.com/shorts/Datv2L6t3-4?si=poTimOvBD5gY4-Zt' },
    { nome: 'Elevação Lateral', descricao: 'Levante halteres até os ombros', series: '3 séries de 12-15', observacao: 'Peso leve a moderado', imagem: './img/lateral.png', video: 'https://youtube.com/shorts/nhQ4mdk0TmM?si=86dPDwEEfiEen18l' },
    { nome: 'Rosca Direta', descricao: 'Levante a barra até os ombros', series: '3 séries de 10-12', observacao: 'Peso moderado', imagem: './img/rosca.png', video: 'https://youtube.com/shorts/ojlJslnaae4?si=R8wug0pa47gCvCcj' }
];

// Normalizar texto
function normalizarTexto(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Criar card
function criarCard(exercicio, comAdicionar = true) {
    const template = document.getElementById("card-template");
    const card = template.content.cloneNode(true);

    card.querySelector(".card-img").src = exercicio.imagem;
    card.querySelector(".card-img").alt = exercicio.nome;
    card.querySelector(".card-nome").textContent = exercicio.nome;
    card.querySelector(".card-desc").textContent = exercicio.descricao;
    card.querySelector(".card-series").textContent = exercicio.series;
    card.querySelector(".card-obs").textContent = exercicio.observacao;

    // Botão vídeo
    card.querySelector(".btn-video").onclick = () => window.open(exercicio.video, "_blank");

    // Botão adicionar
    const btnAdicionar = card.querySelector(".btn-adicionar");
    if (comAdicionar) {
        btnAdicionar.onclick = () => {
            const clone = criarCard(exercicio, false);
            areaTreino.appendChild(clone);
        };
    } else {
        btnAdicionar.remove();
    }

    // Botão remover
    card.querySelector(".btn-remover").onclick = (e) => e.target.closest(".card").remove();

    return card;
}

// Mostrar todos os exercícios
window.onload = () => {
    listaProcurados.innerHTML = "";
    exercicios.forEach(ex => {
        const card = criarCard(ex, true);
        listaProcurados.appendChild(card);
    });
};

// Buscar exercícios
procurar.onclick = () => {
    const termo = normalizarTexto(treinoInput.value.trim());
    listaProcurados.innerHTML = "";

    const resultados = exercicios.filter(ex => normalizarTexto(ex.nome).includes(termo));

    if (resultados.length === 0) {
        alert("Nenhum exercício encontrado.");
        return;
    }

    resultados.forEach(ex => {
        const card = criarCard(ex, true);
        listaProcurados.appendChild(card);
    });
};