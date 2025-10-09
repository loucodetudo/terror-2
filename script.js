/*
 * script.js
 *
 * Este arquivo contém toda a lógica interativa para o site de terror
 * psicológico. Mensagens aleatórias são exibidas em intervalos para
 * criar tensão, acompanhadas por um som inquietante. Um efeito de
 * "glitch" altera levemente a posição do texto para tornar a
 * experiência desconfortável.
 */

// Mensagens de terror psicológico. Sinta‑se livre para alterar ou
// adicionar mais frases – o ideal é despertar ansiedade e criar
// inquietação sem recorrer a violência explícita.
const messages = [
  'Você sente uma presença atrás de você.',
  'O relógio parou. O tempo não avança.',
  'Há algo te observando no escuro.',
  'Não olhe para trás.',
  'Você não está sozinho.',
  'Alguém sussurra seu nome.',
  'O silêncio é ensurdecedor.',
  'Você quer sair, mas as portas desapareceram.',
  'Um frio percorre sua espinha.',
  'Tudo que você conhece não é real.'
];

const messageContainer = document.getElementById('messageContainer');
const messageElement = document.getElementById('message');
const startButton = document.getElementById('startBtn');
const audio = document.getElementById('audio');

/**
 * Seleciona uma mensagem aleatória da lista e a mostra na tela. O som
 * inquietante é reproduzido a cada nova mensagem. Após exibir a
 * mensagem, agenda a próxima chamada para manter o ciclo.
 */
function showMessage() {
  const index = Math.floor(Math.random() * messages.length);
  const text = messages[index];
  messageElement.textContent = text;
  messageContainer.classList.remove('hidden');
  // Reinicia o áudio caso já esteja tocando
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {/* o usuário pode ter bloqueado auto‑play */});
  }
  // Agenda a próxima mensagem em um intervalo irregular (5‑8 segundos)
  const nextDelay = 5000 + Math.random() * 3000;
  setTimeout(showMessage, nextDelay);
}

/**
 * Aplica um pequeno deslocamento ao texto em intervalos muito curtos para
 * simular um efeito de glitch. Este deslocamento aleatório dá a
 * sensação de instabilidade, sem dificultar a leitura.
 */
function applyGlitch() {
  const dx = (Math.random() - 0.5) * 4; // deslocamento horizontal
  const dy = (Math.random() - 0.5) * 4; // deslocamento vertical
  messageElement.style.transform = `translate(${dx}px, ${dy}px)`;
}

// Chama applyGlitch aproximadamente 15 vezes por segundo
setInterval(applyGlitch, 70);

// Inicializa a experiência quando o visitante clica no botão
startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  showMessage();
});