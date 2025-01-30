


document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0; // Índice atual da imagem
  const images = [
    "bask.png",
    "foot.png",
    "surf.png",
    "tennis.png",
    "volei.png",
  ];
  const bodyElement = document.body; // Alvo para alterar o background

  function changeBackground() {
    bodyElement.classList.add("fade-out"); // Adiciona um efeito de transição
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length; // Atualiza o índice da imagem
      bodyElement.style.backgroundImage = `url(${images[currentIndex]})`; // Altera a imagem de fundo no body
      bodyElement.style.backgroundRepeat = "no-repeat"; // Impede a repetição da imagem
      bodyElement.style.backgroundPosition = "center"; // Centraliza a imagem
      bodyElement.style.backgroundAttachment = "fixed"; // Faz com que a imagem fique fixa durante o scroll
      bodyElement.style.backgroundSize = "cover"; // Ajusta a imagem para cobrir toda a tela
      bodyElement.classList.remove("fade-out"); // Remove a transição para o próximo ciclo
    }, 500); // Aguarda 500ms para trocar a imagem
  }

  // Inicializa o background com a primeira imagem
  bodyElement.style.backgroundImage = `url(${images[currentIndex]})`;
  bodyElement.style.backgroundRepeat = "no-repeat"; // Impede a repetição da imagem
  bodyElement.style.backgroundPosition = "center"; // Centraliza a imagem
  bodyElement.style.backgroundAttachment = "fixed"; // Faz com que a imagem fique fixa durante o scroll
  bodyElement.style.backgroundSize = "cover"; // Ajusta a imagem para cobrir toda a tela

  // Executa a troca de background a cada 20 segundos
  setInterval(changeBackground, 20000);
});
