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
  'Tudo que você conhece não é real.',
  'A luz piscou. Você piscou junto?',
  'Alguma coisa respirou no seu ouvido.'
];

const whispers = [
  'CORRA',
  'FICA',
  'OLHE',
  'ATRÁS',
  'NÃO DORME',
  'ELE VOLTOU'
];

const messageContainer = document.getElementById('messageContainer');
const messageElement = document.getElementById('message');
const startButton = document.getElementById('startBtn');
const audio = document.getElementById('audio');
const flash = document.getElementById('flash');
const whisperElement = document.getElementById('whisper');
const title = document.querySelector('h1');

let hasStarted = false;

function typeWriter(text, speed = 38) {
  messageElement.textContent = '';
  let index = 0;

  const typer = setInterval(() => {
    messageElement.textContent += text.charAt(index);
    index += 1;
    if (index >= text.length) {
      clearInterval(typer);
    }
  }, speed);
}

function randomChoice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function triggerFlash() {
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), 90);
}

function showWhisper() {
  whisperElement.textContent = randomChoice(whispers);
  whisperElement.classList.remove('hidden');
  whisperElement.style.animation = 'none';
  whisperElement.offsetHeight;
  whisperElement.style.animation = '';
  setTimeout(() => whisperElement.classList.add('hidden'), 1800);
}

function pulseTitle() {
  title.classList.remove('pulse');
  title.offsetHeight;
  title.classList.add('pulse');
}

function showMessage() {
  const text = randomChoice(messages);
  messageContainer.classList.remove('hidden');
  typeWriter(text);

  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  pulseTitle();

  if (Math.random() > 0.55) {
    triggerFlash();
  }

  if (Math.random() > 0.6) {
    showWhisper();
  }

  const nextDelay = 3200 + Math.random() * 2800;
  setTimeout(showMessage, nextDelay);
}

function applyGlitch() {
  if (!hasStarted) {
    return;
  }

  const dx = (Math.random() - 0.5) * 6;
  const dy = (Math.random() - 0.5) * 6;
  messageElement.style.transform = `translate(${dx}px, ${dy}px)`;
}

setInterval(applyGlitch, 60);

startButton.addEventListener('click', () => {
  hasStarted = true;
  startButton.style.display = 'none';
  showMessage();
});
