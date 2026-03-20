/* like buttons */
const buttonLikeInput = document.querySelector(".buttonsLike__input");
//const likesCount = document.querySelector(".buttonsLike__counter");

//let count = parseInt(likesCount.textContent);

buttonLikeInput.addEventListener("change", (event) => {
  const input = event.target; // почитать
  const likesCount = input.parentElement.querySelector(".buttonsLike__counter");
  let count = parseInt(likesCount.textContent);
  if (buttonLikeInput.checked) {
    count++;
  } else {
    count--;
  }
  likesCount.textContent = count;
});

/* Rate Buttons */

const buttons = document.querySelectorAll(".buttonStars");
// Выбираем все залитые звезды

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Выбираем все звезды
    const starsOn = document.querySelectorAll(".buttonsRate__stars");
    // Сбрасываем активный класс у всех залитых звезд
    starsOn.forEach((star) => star.classList.remove("active"));
    // Красим все звезды ДО нажатой включительно
    for (let i = 0; i <= index; i++) {
      starsOn[i].classList.add("active");
    }
  });
});
