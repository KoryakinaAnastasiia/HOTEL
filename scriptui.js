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

document.querySelectorAll(".dropdown__counter").forEach((counter) => {
  const minusBtn = counter.querySelector(".dropdown__button-minus");
  const plusBtn = counter.querySelector(".dropdown__button-plus");
  const span = counter.querySelector(".dropdown__span");
  const dropdown = counter.closest(".dropdown");

  plusBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // ОСТАНОВИТЬ ЗАКРЫТИЕ
    span.textContent = parseInt(span.textContent) + 1;
    updateStatus(dropdown);
  });

  minusBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // ОСТАНОВИТЬ ЗАКРЫТИЕ
    let val = parseInt(span.textContent);
    if (val > 0) {
      span.textContent = val - 1;
      updateStatus(dropdown);
    }
  });
});

const btnApply = document.querySelector(".dropdown__button-apply");
const btnApplyClean = document.querySelector(".dropdown__button-clean");

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

function updateStatus(dropdown) {
  const input = dropdown.querySelector(".dropdown__input");
  const spans = dropdown.querySelectorAll(".dropdown__span");
  const titles = dropdown.querySelectorAll(".dropdown__title");
  const cleanBtn = dropdown.querySelector(".dropdown__button-clean");

  let total = 0;
  let parts = [];

  spans.forEach((span, index) => {
    const count = parseInt(span.textContent);
    total += count;

    if (count > 0) {
      const type = titles[index].textContent.toLowerCase().trim();
      parts.push(`${count} ${getPlural(count, type)}`);
    }
  });

  // Логика для Гостей (показываем "5 гостей" суммарно)
  if (input.placeholder.includes("гост")) {
    input.value = total > 0 ? `${total} ${getPlural(total, "гостей")}` : "";
  } else {
    // Логика для Комнат (перечисляем через запятую: "2 спальни, 1 кровать")
    input.value = parts.join(", ");
  }

  // Показываем/скрываем кнопку "Очистить"
  if (cleanBtn) {
    if (total > 0) {
      cleanBtn.style.display = "block";
      cleanBtn.style.opacity = "1";
    } else {
      cleanBtn.style.display = "none";
    }
  }
}
