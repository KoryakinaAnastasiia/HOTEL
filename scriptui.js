/* like buttons */
const buttonLikeInput = document.querySelector(".buttons-like__input");

buttonLikeInput.addEventListener("change", (event) => {
  const input = event.target; // почитать
  const likesCount = input.parentElement.querySelector(".buttons-like__span");
  let count = parseInt(likesCount.textContent);
  if (buttonLikeInput.checked) {
    count++;
  } else {
    count--;
  }
  likesCount.textContent = count;
});
/* end of like buttons */

/* rate buttons */

const buttons = document.querySelectorAll(".buttons-rate__buttons");

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Выбираем все звезды
    const starsOn = document.querySelectorAll(".buttons-rate__img");
    // Сбрасываем активный класс у всех залитых звезд
    starsOn.forEach((star) => star.classList.remove("active"));
    // Красим все звезды ДО нажатой включительно
    for (let i = 0; i <= index; i++) {
      starsOn[i].classList.add("active");
    }
  });
});

/* end of rate buttons */

/*Dropdown */
// Один обработчик работает для ВСЕХ дропдаунов на странице
document.querySelectorAll(".dropdown__trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();

    // closest() поднимается вверх по DOM и находит родительский блок .dropdown
    const dropdown = trigger.closest(".dropdown");

    // Закрываем все остальные открытые дропдауны
    document.querySelectorAll(".dropdown--open").forEach((other) => {
      if (other !== dropdown) other.classList.remove("dropdown--open");
    });

    // Переключаем текущий
    dropdown.classList.toggle("dropdown--open");
  });
});

// Закрытие при клике вне любого дропдауна
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown--open").forEach((dropdown) => {
    dropdown.classList.remove("dropdown--open");
  });
});

const allMinusBtnsRooms = document.querySelectorAll(".dropdown__button-minus");
const allPlusBtnsRooms = document.querySelectorAll(".dropdown__button-plus");

document.querySelectorAll(".dropdown__button-plus").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const span = e.currentTarget.parentElement.querySelector("span");
    span.textContent = parseInt(span.textContent) + 1;
    Updatestatus();
  });
});

//счетчик минуса
document.querySelectorAll(".dropdown__button-minus").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const span = e.currentTarget.parentElement.querySelector("span");
    let val = parseInt(span.textContent);
    if (val > 0) {
      span.textContent = val - 1;
      Updatestatus();
    }
  });
});

const menuPeople = document.querySelector(".dropdown__peopleExpander");
const btnApply = document.querySelector(".dropdown__button-apply");
const allSpans = document.querySelectorAll(".dropdown__span");
const btnApplyClean = document.querySelector(".dropdown__button-clean");
const inputData = document.querySelector(".dropdown__input");

// закрытие при клике вне блока
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
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
    ".dropdown__expander .dropdown__span",
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
      ".dropdown__expander .dropdown__span",
    );
    peopleSpans.forEach((span) => (span.textContent = "0"));
    Updatestatus();
  });
}
