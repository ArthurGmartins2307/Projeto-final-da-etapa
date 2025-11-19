// --- ELEMENTOS DO DOM ---
const procurar = document.getElementById('procurarTreino');
const treinoInput = document.getElementById('treino');
const areaTreino = document.getElementById('treino2'); // Área de treinos adicionados
const listaTreinos = document.getElementById('procurados'); // Área de treinos encontrados

// --- ARRAYS DE CONTROLE ---
const treinosProcurados = [];
const treinosAdicionados = [];

// --- FUNÇÃO PARA CRIAR E ADICIONAR CARD ---
function adicionarTreino(nome, descricao, series, observacao, imagem, video) {

  // Evita duplicados na lista de procurados
  if (treinosProcurados.includes(nome) || treinosAdicionados.includes(nome)) {
    alert(`${nome} já está na lista!`);
    return;
  }

  treinosProcurados.push(nome);

  // --- CARD ---
  const card = document.createElement('div');
  card.classList.add('treinoCard');

  // --- IMAGEM ---
  const img = document.createElement('img');
  img.src = imagem || 'img/placeholder.jpg';
  img.alt = nome;

  // --- TEXTOS ---
  const h3 = document.createElement('h3');
  h3.textContent = nome;

  const pDescricao = document.createElement('p');
  pDescricao.textContent = descricao;

  const pSeries = document.createElement('p');
  pSeries.textContent = series;

  const pObservacao = document.createElement('p');
  pObservacao.textContent = observacao;

  // --- BOTÃO ASSISTIR ---
  const botaoAssistir = document.createElement('button');
  botaoAssistir.style.backgroundImage = "url('./imagens/play.png')";
  botaoAssistir.style.backgroundSize = "contain";
  botaoAssistir.style.backgroundRepeat = "no-repeat";
  botaoAssistir.style.width = "40px";
  botaoAssistir.style.height = "40px";
  botaoAssistir.classList.add('assistirBtn');
  botaoAssistir.addEventListener('click', () => {
    window.open(video, '_blank'); // abre o vídeo em nova aba
  });

  // --- BOTÃO ADICIONAR ---
  const botaoAdicionar = document.createElement('button');
  botaoAdicionar.textContent = 'Adicionar treino';
  botaoAdicionar.classList.add('adicionarBtn');
  botaoAdicionar.addEventListener('click', () => {
      // Evita duplicados na área de treino
      if (treinosAdicionados.includes(nome)) {
          alert(`${nome} já está na sua lista de treino!`);
          return;
      }

      // Adiciona o treino na área de treino
      areaTreino.appendChild(card);
      treinosAdicionados.push(nome);

      // Remove da lista de procurados
      const index = treinosProcurados.indexOf(nome);
      if (index !== -1) treinosProcurados.splice(index, 1);
  });

  // --- BOTÃO REMOVER ---
  const botaoRemover = document.createElement('button');
  botaoRemover.textContent = 'Remover treino';
  botaoRemover.classList.add('removerBtn');
  botaoRemover.addEventListener('click', () => {
      // Remove o card de onde ele estiver
      if (card.parentElement) {
          card.parentElement.removeChild(card);
      }

      // Remove dos arrays de controle
      let index = treinosProcurados.indexOf(nome);
      if (index !== -1) treinosProcurados.splice(index, 1);

      index = treinosAdicionados.indexOf(nome);
      if (index !== -1) treinosAdicionados.splice(index, 1);
  });

  // --- MONTAGEM DO CARD ---
  card.appendChild(img);
  card.appendChild(h3);
  card.appendChild(pDescricao);
  card.appendChild(pSeries);
  card.appendChild(pObservacao);
  card.appendChild(botaoAssistir);
  card.appendChild(botaoAdicionar);
  card.appendChild(botaoRemover);

  // --- ADICIONA O CARD À LISTA DE PROCURADOS ---
  listaTreinos.appendChild(card);
}


// --- SISTEMA DE BUSCA ---
procurar.addEventListener('click', () => {
  const treino = treinoInput.value.trim().toLowerCase();

  if (treino === 'supino inclinado') {
      adicionarTreino(
          'Supino Inclinado',
          'Deite no banco inclinado, segure a barra, abaixe até o peito e empurre de volta',
          '3 séries de 10 repetições',
          'Peso: Moderado',
          './imagens/supino.png',
          'https://youtube.com/shorts/NrurrUZ9bfw?si=lxbkKnMSPIyEiP7l'
      );
  } else if (treino === 'agachamento livre') {
      adicionarTreino(
          'Agachamento Livre',
          'Fique em pé com os pés na largura dos ombros, agache mantendo as costas retas e volte à posição inicial',
          '4 séries de 12 repetições',
          'Peso: Leve a Moderado',
          './imagens/agachamento.png',
          'https://youtube.com/shorts/8V2SwkHTLek?si=LeS0jGNWqUOoJT-P'
      );
  } else if (treino === 'peck deck'){ 
        adicionarTreino(
            'Peck Deck',
            'Sente-se na máquina, posicione os braços nas almofadas e junte-os à frente do peito',
            '3 séries de 12-15 repetições',
            'Peso: Leve a Moderado',
            './imagens/peck-deck.png',
            'https://youtube.com/shorts/rOrr4kSwQpE?si=JmpAGKgH7b3e3dot'
        );
  } else if (treino === 'desenvolvimento com halteres'){ 
        adicionarTreino(
            'Desenvolvimento com Halteres',
            'Sente-se em um banco com encosto, segure os halteres na altura dos ombros e empurre-os para cima até estender os braços',
            '3 séries de 10-12 repetições',
            'Peso: Moderado',
            './imagens/desenvolvimento.png',
            'https://youtube.com/shorts/Wywt3mN-6RA?si=OVi7fczoJfgBDwle'
        );
  } else if (treino === 'levantamento terra'){ 
        adicionarTreino(
            'Levantamento Terra',
            'Com a barra no chão, mantenha as costas retas, levante a barra estendendo os quadris e joelhos, depois abaixe lentamente',
            '4 séries de 6-8 repetições',
            'Peso: Pesado',
            './imagens/terra.png',
            'https://youtube.com/shorts/oSaXuwqLpWc?si=jZjfumXlELBCZCmJ'
        );
    } else if (treino === 'barra fixa') { 
        adicionarTreino(
            'Barra Fixa',
            'Segure a barra com as palmas das mãos voltadas para frente, puxe o corpo para cima até o queixo ultrapassar a barra e abaixe lentamente',
            '3 séries de 8-10 repetições',
            'Peso: Peso Corporal',
            './imagens/barra.png',
            'https://youtube.com/shorts/BYYxtz9MtDc?si=G9_F307teGa4smK8'
        );
    } else if (treino === 'flexão de braço' || treino === 'flexao de braco' || treino === 'flexao de braço' || treino === 'flexão de braco') {    
        adicionarTreino(
            'Flexão de Braço',
            'Deite-se de barriga para baixo, coloque as mãos no chão na largura dos ombros, empurre o corpo para cima e abaixe novamente',
            '4 séries de 12-15 repetições',
            'Peso: Peso Corporal',
            './imagens/flexao.png',
            'https://youtube.com/shorts/pRzxpe5_LLk?si=BHjJ6aWQ-tfgd-1w'  
        );
    } else if (treino === 'abdominal crunch' || treino === 'abdominal') {
        adicionarTreino(
            'Abdominal',
            'Deite-se de costas com os joelhos dobrados, levante a parte superior do corpo em direção aos joelhos e volte à posição inicial',
            '3 séries de 15-20 repetições',
            'Peso: Peso Corporal',
            './imagens/abdominal.png',
            'https://youtube.com/shorts/kiqKO0tTFVw?si=XryMhiVBmkr12nJC'
        );
    } else if (treino === 'prancha') {
        adicionarTreino(
            'Prancha',
            'Deite-se de bruços, levante o corpo apoiando-se nos antebraços e pontas dos pés, mantendo o corpo reto',
            '3 séries de 30-60 segundos',
            'Peso: Peso Corporal',
            './imagens/prancha.png',
            'https://youtube.com/shorts/jZY0XzzXleI?si=9CLTzjWM7PD0jkky'
        );
    } else if (treino === 'pull-over com halteres' || treino === 'pull over com halteres' || treino === 'pull-over com halter' || treino === 'pull over com halter') { 
        adicionarTreino(
            'Pull-Over com Halteres',
            'Deite-se em um banco, segure um haltere com ambas as mãos acima do peito, abaixe-o lentamente atrás da cabeça e retorne à posição inicial',
            '3 séries de 10-12 repetições',
            'Peso: Moderado',
            './imagens/pull-over.png',
            'https://youtube.com/shorts/Datv2L6t3-4?si=poTimOvBD5gY4-Zt'
        );
    } else if (treino === 'elevação lateral de ombros com halteres' || treino === 'elevacao lateral de ombros com halteres' || treino === 'elevacão lateral de ombros com halter' || treino === 'elevaçao lateral de ombros com halter' || treino === 'elevação lateral' || treino === 'elevacao lateral' || treino === 'elevaçao lateral' || treino === 'elevacão lateral') { 
        adicionarTreino(
            'Elevação Lateral de Ombros com Halteres',
            'Fique em pé segurando halteres ao lado do corpo, levante-os lateralmente até a altura dos ombros e abaixe lentamente',
            '3 séries de 12-15 repetições',
            'Peso: Leve a Moderado',
            './imagens/lateral.png',
            'https://youtube.com/shorts/nhQ4mdk0TmM?si=86dPDwEEfiEen18l'
        );
    } else if (treino === 'rosca direta com barra') {   
        adicionarTreino(
            'Rosca Direta com Barra',
            'Segure a barra com as palmas das mãos voltadas para cima, levante a barra em direção aos ombros e abaixe lentamente',
            '3 séries de 10-12 repetições',
            'Peso: Moderado',
            './imagens/rosca.png',
            'https://youtube.com/shorts/ojlJslnaae4?si=R8wug0pa47gCvCcj'
        );
    } else {
      alert('Treino não encontrado. Tente novamente.');
  }
});
