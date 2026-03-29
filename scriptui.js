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

const allMinusBtnsRooms = document.querySelectorAll(".dropdown__minus");
const allPlusBtnsRooms = document.querySelectorAll(".dropdown__plus");

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

//d

//dropdownPeople
const allMinusBtns = document.querySelectorAll(".dropdown__minusPeople");
const allPlusBtns = document.querySelectorAll(".dropdown__plusPeople");
// const dataCount = document.getElementById("peoplesData");
const btnPeople = document.querySelector(".arrow_buttonTwo");
const menuPeople = document.querySelector(".dropdown__peopleExpander");
const btnApply = document.querySelector(".BtnApply");
const allSpans = document.querySelectorAll(".dropdown__counter span");
const btnApplyClean = document.querySelector(".BtnApplyClean");
const inputData = document.querySelector(".dropdown__input");

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

// закрытие при клике на кнопку "применить"
btnApply.addEventListener("click", (e) => {
  e.preventDefault();
  menuPeople.classList.remove("active");
});

//кнопка очистить
const prRu = new Intl.PluralRules("ru-RU");
const guestsPr = {
  zero: "гостей",
  one: "гость",
  few: "гостя",
  other: "гостей",
  many: "гостей",
};

function Updatestatus() {
  let total = 0;
  const peopleSpans = document.querySelectorAll(
    ".dropdown__peopleExpander .dropdown__counter span",
  );
  peopleSpans.forEach((span) => {
    total += parseInt(span.textContent);
  });

  inputData.value =
    total === 0 ? "Сколько гостей" : `${total} ${guestsPr[prRu.select(total)]}`;

  if (total > 0) {
    btnApplyClean.classList.add("active");
  } else {
    btnApplyClean.classList.remove("active");
  }

  btnApplyClean.addEventListener("click", (e) => {
    e.preventDefault();
    const peopleSpans = document.querySelectorAll(
      ".dropdown__peopleExpander .dropdown__counter span",
    );
    peopleSpans.forEach((span) => (span.textContent = "0"));
    Updatestatus();
  });
}

//счетчик плюса
document.querySelectorAll(".dropdown__plusPeople").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const span = e.currentTarget.parentElement.querySelector("span");
    span.textContent = parseInt(span.textContent) + 1;
    Updatestatus();
  });
});

//счетчик минуса
document.querySelectorAll(".dropdown__minusPeople").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const span = e.currentTarget.parentElement.querySelector("span");
    let val = parseInt(span.textContent);
    if (val > 0) {
      span.textContent = val - 1;
      Updatestatus();
    }
  });
});
