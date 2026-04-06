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

/*dropdown */

// Один обработчик работает для ВСЕХ дропдаунов на странице
document.querySelectorAll(".dropdown__trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    // closest() поднимается вверх по DOM и находит родительский блок .dropdown
    e.stopPropagation();
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
const prRu = new Intl.PluralRules("ru-RU");

const pluralMaps = {
  гости: { one: "гость", few: "гостя", many: "гостей" },
  спальни: { one: "спальня", few: "спальни", many: "спален" },
  кровати: { one: "кровать", few: "кровати", many: "кроватей" },
  "ванные комнаты": {
    one: "ванная комната",
    few: "ванные комнаты",
    many: "ванных комнат",
  },
};

function getPlural(count, type) {
  const key = prRu.select(count);
  return pluralMaps[type][key] || pluralMaps[type].many;
}

function updateStatus(dropdown) {
  const input = dropdown.querySelector(".dropdown__input");
  const spans = dropdown.querySelectorAll(".dropdown__span");
  const titles = dropdown.querySelectorAll(".dropdown__title");
  const cleanBtn = dropdown.querySelector(".dropdown__button-clean");

  let total = 0;
  let parts = [];

  // Проверяем, какой это дропдаун по наличию слова "взрослые" в первом ряду
  const isGuestDropdown = titles[0].textContent
    .toLowerCase()
    .includes("взросл");

  spans.forEach((span, index) => {
    const count = parseInt(span.textContent);
    total += count;

    if (count > 0 && !isGuestDropdown) {
      // Для комнат: собираем массив строк "1 спальня", "2 кровати"
      const type = titles[index].textContent.toLowerCase().trim();
      parts.push(`${count} ${getPlural(count, type)}`);
    }
  });

  if (isGuestDropdown) {
    // Для гостей: только общее число и слово "гость/гостя/гостей"
    input.value = total > 0 ? `${total} ${getPlural(total, "гости")}` : "";
  } else {
    // Для комнат: объединяем массив в строку через запятую
    input.value = parts.join(", ");
  }

  // Показываем/скрываем кнопку очистки
  if (cleanBtn) {
    cleanBtn.style.opacity = total > 0 ? "1" : "0";
    cleanBtn.style.pointerEvents = total > 0 ? "auto" : "none";
  }
}

document.querySelectorAll(".dropdown__button-clean").forEach((cleanBtn) => {
  cleanBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Чтобы дропдаун не закрылся при клике

    // Находим родительский дропдаун
    const dropdown = cleanBtn.closest(".dropdown");

    // 1. Сбрасываем все счетчики (спаны) в 0
    dropdown.querySelectorAll(".dropdown__span").forEach((span) => {
      span.textContent = "0";
    });

    // 2. Обновляем статус (инпут очистится, кнопка скроется)
    updateStatus(dropdown);
  });
});

/* end of dropdown */

/* dropdown-checkbox */

const dropChIn = document.querySelectorAll(".dropdown-checkbox__input");
const dropChEx = document.querySelector(".dropdown-checkbox__expandable");

dropChIn.forEach((input) => {
  input.addEventListener("click", (e) => {
    e.stopPropagation();
    // Используем правильную переменную и toggle для открытия/закрытия
    dropChEx.classList.toggle("active");
  });
});

/* end of dropdown-checkbox */
