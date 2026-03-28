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
/*Dropdown flashback*/

const btn = document.getElementById("arrow_button");
const menu = document.getElementById("mobileMenu");
const btnclose = document.getElementById("menuBtnClose");

btn.addEventListener("click", (e) => {
  e.stopPropagation(); // Останавливает всплытие к родителю
  menu.classList.toggle("active");
});

// Закрытие меню при клике вне его области
btnclose.addEventListener("click", () => {
  menu.classList.remove("active");
});

/*Dropdown plus minus*/
// const plusBtn = document.querySelectorAll(".dropdownBad__plus");
// const minusBtn = document.querySelectorAll(".dropdownBad__minus");
// let counter = document.querySelectorAll(".dropdown__counter span");

// plusBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   let counterInt = parseInt(counter.textContent);
//   counter.textContent = counterInt + 1;
// });

// minusBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   let counterInt = parseInt(counter.textContent);
//   if (counterInt > 0) {
//     counter.textContent = counterInt - 1;
//   }
// });
const dataCount = document.getElementById("peoplesData");
const allPlusBtns = document.querySelectorAll(".dropdown__plus");

allPlusBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Ищем span именно в том блоке, где нажата кнопка
    const counterSpan = e.target.parentElement.querySelector("span");
    counterSpan.textContent = parseInt(counterSpan.textContent) + 1;
    dataCount = counterSpan.textContent;
  });
});

const allMinusBtns = document.querySelectorAll(".dropdown__minus");

allMinusBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Ищем span именно в том блоке, где нажата кнопка
    const counterSpan = e.target.parentElement.querySelector("span");
    let counter = parseInt(counterSpan.textContent);
    if (counter > 0) {
      counterSpan.textContent = counter - 1;
    }
  });
});

const btnPeople = document.querySelector(".arrow_buttonTwo");
const menuPeople = document.querySelector(".dropdown__peopleExpander");
const btnApply = document.querySelector(".BtnApply");
const btnApplyClean = document.querySelector(".BtnApplyClean");
const allSpans = document.querySelectorAll(".dropdown__counter span");

btnPeople.addEventListener("click", (e) => {
  e.stopPropagation(); // Останавливает всплытие к родителю
  menuPeople.classList.toggle("active");
});

// закрытие при клике вне блока
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown__peoples")) {
    menuPeople.classList.remove("active");
  }
});

btnApply.addEventListener("click", (e) => {
  menuPeople.classList.remove("active");
});

btnApplyClean.addEventListener("click", (e) => {
  e.stopPropagation(); // Останавливает всплытие к родителю
  allSpans.forEach((span) => (span.textContent = "0"));
});
