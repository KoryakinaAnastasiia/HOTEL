/* like buttons */
const buttonLike = document.querySelector(".buttonsLike__input");
const hartElements = document.querySelector(".buttonsLike__counter");

let count = parseInt(hartElements.textContent);

buttonLike.addEventListener("change", () => {
  if (buttonLike.checked) {
    count++;
  } else {
    count--;
  }
  hartElements.textContent = count;
});

/* Rate Buttons */

const buttons = document.querySelectorAll(".buttonStars");
// Выбираем все залитые звезды
const starsOn = document.querySelectorAll(".buttonsRate__stars");
// Выбираем все звезды
const stars = document.querySelectorAll(".buttonsRate__starsBorder");

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // 1. Сбрасываем активный класс у всех залитых звезд
    starsOn.forEach((star) => star.classList.remove("active"));
    stars.forEach((starsOff) => starsOff.classList.add("active"));
    // 2. Красим все звезды ДО нажатой включительно
    for (let i = 0; i <= index; i++) {
      starsOn[i].classList.add("active");
      stars[i].classList.remove("active");
    }
  });
});
