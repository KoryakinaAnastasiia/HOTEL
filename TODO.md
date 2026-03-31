# Задания по исправлению кода — Design System (BEM)

---

## Часть 1. Теория — что такое HTML/CSS Design System и BEM

### Что такое Design System на чистом HTML/CSS

Когда говорят «дизайн-система», часто имеют в виду React-компоненты или Figma-библиотеку. Но исторически первые дизайн-системы были устроены иначе: они задавали **набор готовых CSS-классов**, которые разработчик просто добавлял к нужным HTML-тегам.

Самый известный пример — **Bootstrap**. Его принцип прост:

```html
<!-- Не нужно ничего писать в CSS — достаточно добавить нужный класс -->
<button class="btn btn-primary btn-lg">Купить</button>
<div class="card shadow-sm p-3">...</div>
<input class="form-control form-control-lg" />
```

Разработчик подключает один CSS-файл и получает готовую «библиотеку деталей». Это и есть HTML/CSS design system.

#### Как она устроена внутри

Такая система строится из трёх слоёв:

```
┌─────────────────────────────────────────────────────┐
│  3. Компоненты  (.card, .dropdown, .checkbox)       │
│     Готовые блоки с поведением и внешним видом      │
├─────────────────────────────────────────────────────┤
│  2. Утилиты  (.text-uppercase, .d-flex, .gap-2)     │
│     Атомарные классы для быстрой настройки          │
├─────────────────────────────────────────────────────┤
│  1. Токены  (--color-primary, --font-size-body)     │
│     CSS-переменные: цвета, шрифты, отступы          │
└─────────────────────────────────────────────────────┘
```

В твоём проекте уже есть все три слоя:

- **Токены** — `variables.css` (`--Dark-Shade100`, `--h3-font-size` и т.д.)
- **Компоненты** — `ui.css` (`.button`, `.dropdown`, `.checkbox-ios` и т.д.)
- **Глобальные стили** — `globals.css` (сброс стилей браузера)

Это правильная архитектура. Проблема не в структуре файлов, а в именовании классов внутри них.

#### Почему именование так важно

Представь, что дизайн-система — это конструктор LEGO. Каждый CSS-класс — это деталь. Если детали называются хаотично (`.BtnApply`, `.arrow_buttonTwo`, `.data__form`), то:

- Новый разработчик не поймёт, какую деталь взять
- Непонятно, можно ли переиспользовать класс в другом месте
- Сложно найти стили в CSS-файле

BEM решает именно эту проблему — он даёт **систему имён**, по которой класс объясняет сам себя.

---

### Методология BEM — подробно

BEM расшифровывается как **Block — Element — Modifier** (Блок — Элемент — Модификатор). Это не фреймворк и не библиотека — это **соглашение об именовании CSS-классов**.

#### Блок (Block)

Самостоятельный переиспользуемый компонент. Он не зависит от окружения — его можно поставить в любое место страницы, и он будет выглядеть одинаково.

```
Примеры блоков: button, dropdown, checkbox, text-input, card
```

```html
<button class="button">...</button>
<div class="dropdown">...</div>
<label class="checkbox">...</label>
```

**Признак блока:** можно задать вопрос «что это?» и ответ будет конкретным существительным.

#### Элемент (Element) — разделитель `__`

Часть блока, которая не имеет смысла вне него. Кнопки у счётчика внутри дропдауна (`+` и `-`) — это элементы блока `dropdown`. Отдельно они не используются.

```
Синтаксис: .блок__элемент
```

```html
<div class="dropdown">
  <input class="dropdown__input" />
  <div class="dropdown__expander">
    <h3 class="dropdown__title">Спальни</h3>
    <div class="dropdown__counter">
      <button class="dropdown__minus">-</button>
      <span class="dropdown__count">0</span>
      <button class="dropdown__plus">+</button>
    </div>
  </div>
</div>
```

**Важное правило:** элемент всегда принадлежит блоку, а не другому элементу. Даже если в HTML элемент вложен глубоко, в CSS он всё равно пишется как `блок__элемент`, а не `блок__элемент__подэлемент`.

```css
/* ✗ Неправильно — двойная вложенность */
.dropdown__expander__title {
}

/* ✓ Правильно — всегда от корня блока */
.dropdown__title {
}
```

#### Модификатор (Modifier) — разделитель `--`

Вариация блока или элемента. Меняет внешний вид или состояние, не создавая новый компонент.

```
Синтаксис: .блок--модификатор  или  .блок__элемент--модификатор
```

```html
<!-- Одна и та же кнопка, разные виды -->
<button class="button">Primary</button>
<button class="button button--outline">Secondary</button>
<button class="button button--full-width">Full Width</button>

<!-- Дропдаун в открытом состоянии -->
<div class="dropdown__expander dropdown__expander--active">...</div>
```

Модификатор **никогда не используется один** — только вместе с основным классом:

```html
<!-- ✗ Неправильно -->
<button class="button--outline">
  <!-- ✓ Правильно -->
  <button class="button button--outline"></button>
</button>
```

#### Полная шпаргалка

```
.block                      — блок
.block__element             — элемент блока
.block--modifier            — модификатор блока
.block__element--modifier   — модификатор элемента

Правила записи:
  ✓ только строчные буквы
  ✓ слова внутри блока/элемента/модификатора — через дефис
  ✗ camelCase:  .myBlock, .dropdownTitle
  ✗ PascalCase: .MyBlock, .BtnApply
  ✗ snake_case: .my_block, .number_guests
```

#### Как читать BEM-класс

Хорошо написанный BEM-класс объясняет себя сам:

```css
.button--outline          /* кнопка, вариант: обводка */
.dropdown__title          /* заголовок внутри дропдауна */
.checkbox__mark--checked  /* маркер чекбокса в состоянии «выбран» */
.text-input--error        /* поле ввода в состоянии ошибки */
```

#### Почему Bootstrap тоже использует BEM (частично)

Посмотри на классы Bootstrap:

```html
<button class="btn btn-primary btn-lg">
  <div class="form-control form-control-lg">
    <div class="modal-dialog modal-dialog-centered"></div>
  </div>
</button>
```

Здесь `btn` — блок, `btn-primary` и `btn-lg` — модификаторы (Bootstrap использует `-` вместо `--`, это их вариация). `modal-dialog` — это блок, `modal-dialog-centered` — его модификатор. Принцип тот же.

---

### Как работает CSS-only компонент (без JavaScript)

Некоторые интерактивные компоненты в твоём проекте сделаны без JS — только на CSS. Это важный паттерн, который стоит понять.

**Принцип:** `<input type="checkbox">` может хранить состояние (checked/unchecked). CSS-псевдокласс `:checked` позволяет стилизовать соседние элементы в зависимости от этого состояния.

```css
/* Когда чекбокс отмечен — показываем иконку-галочку */
.checkbox__input:checked + .checkbox__mark::after {
  display: block;
}

/* Когда чекбокс лайка отмечен — меняем цвет счётчика */
.like__input:checked + .like__content .like__count {
  color: #bc9cff;
}
```

В твоём коде этот паттерн уже используется в `.buttonsLike` и `.checkbox-ios`. Это хорошее решение — оно избавляет от JS для простой интерактивности.

---

## Часть 2. Задания — что исправить в коде

Ниже перечислены конкретные проблемы в коде с объяснением, **что не так** и **как исправить**.
Каждое задание — это отдельный навык, который важно освоить.

---

<!--
## 1. Два класса вместо одного имени блока

**Файл:** `ui.html`, строки 22 и 98

**Проблема:**

```html
<section class="choice input">
  <section class="check box"></section>
</section>
```

Это **два отдельных класса** (`choice` и `input`), которые выглядят как одно название. Браузер применит стили обоих классов по отдельности. В CSS написано `.check.box { }` — это селектор "элемент, у которого есть оба класса одновременно", что нестандартно и запутанно.

**Как должно быть в BEM:**
Блок — это **одно слово** или слова через дефис:

```html
<section class="inputs-section">
  <section class="controls-section"></section>
</section>
```

```css
.inputs-section {
}
.controls-section {
}
```

**Почему это важно:** Непонятно, намеренно ли два класса или это опечатка. Код должен быть однозначным.
-->

---

## 2. Неправильное использование разделителя `__`

**Файл:** `ui.html`, строки 31, 43, 50–70, 74, 86

**Проблема:**

```html
<label class="number_guests__form">
  <label class="data__form">
    <div class="data__form-mini">
      <label class="data__form-mini-first">
        <label class="data__form-mini-second">
          <label class="data__form-filter">
            <label class="data__form-email"></label></label></label
      ></label></div></label
></label>
```

В BEM двойное подчёркивание `__` означает: **«элемент внутри блока»**. То есть `data__form` читается как «элемент `form` внутри блока `data`». Но блока `.data` нигде нет — это самостоятельные компоненты. Они **сами являются блоками**.

**Как должно быть:**
Если это самостоятельный компонент (не часть другого) — это блок, и `__` здесь не нужен:

```html
<label class="text-input">
  <!-- вместо text-field -->
  //сделала
  <label class="guests-input">
    <!-- вместо number_guests__form -->
    //сделала
    <label class="date-input">
      <!-- вместо data__form -->
      //сделала
      <label class="date-input date-input--mini">
        <!-- вместо data__form-mini-first -->
        //сделала
        <label class="date-input date-input--filter">
          <!-- вместо data__form-filter -->
          //сделала
          <label class="date-input date-input--email">
            <!-- вместо data__form-email -->
            //сделала
          </label></label
        ></label
      ></label
    ></label
  ></label
>
```

**Почему это важно:** `__` — это контракт: «я живу только внутри родительского блока». Если нарушить это правило, код становится непредсказуемым при переиспользовании компонента.

**Как это будет использоваться на странице отеля:**

```html
<!-- Форма поиска на главной странице -->
<form class="search-form">
  <div class="date-input">
    <span>Дата заезда</span>
    <input placeholder="ДД.ММ.ГГГГ" />
  </div>
  <div class="date-input date-input--mini">
    <span>Дата выезда</span>
    <input placeholder="ДД.ММ.ГГГГ" />
  </div>
  <div class="guests-input">
    <span>Гости</span>
    <input placeholder="Сколько гостей" />
  </div>
  <button class="button button--full-width">Найти номер</button>
</form>
```

Видно, что `date-input` — это самостоятельный блок, который можно поставить в любую форму на любой странице, просто добавив нужный модификатор.

---

## 3. Подчёркивание `_` вместо дефиса `-` в именах блоков

**Файл:** `ui.html` строка 31, `ui.css` строки 26–48

**Проблема:**

```html
<label class="number_guests__form"></label>
```

Часть имени до `__` — это имя блока. В BEM принято использовать **только дефис** для составных слов в именах блоков и элементов. Подчёркивание не запрещено технически, но нарушает единый стиль и мешает читаемости.

**Как должно быть:**

```html
<label class="number-guests__form">
  <!-- или, как написано выше, лучше сделать это отдельным блоком: -->
  <label class="guests-input"></label
></label>
```

---

## 4. camelCase в именах классов

**Файл:** `ui.html`, строки 271, 278, 286–287

**Проблема:**

```html
<div class="dropdown__defaultPeople">
  <button class="arrow_buttonTwo">
    <button class="dropdown__minusPeople">
      <button class="dropdown__plusPeople"></button>
    </button>
  </button>
</div>
```

В BEM **все буквы строчные**, слова разделяются дефисом. camelCase (заглавная буква в середине слова) в BEM не используется.

**Как должно быть:**

```html
<div class="dropdown__default-people">
  //сделала
  <button class="arrow-button">
    <!-- и использовать модификатор, см. задание 7 -->
    <button class="dropdown__minus-people">
      <!--сделала-->
      <button class="dropdown__plus-people"></button>
      <!--сделала-->
    </button>
  </button>
</div>
```

---

## 5. PascalCase — грубое нарушение соглашения

**Файл:** `ui.html` строки 308–309, `ui.css` строки 666–694

**Проблема:**

```html
<button class="BtnApplyClean">очистить</button>
<button class="BtnApply">применить</button>
```

PascalCase (каждое слово с заглавной буквы) используется в JavaScript для названий классов и компонентов — но **не в CSS**. В BEM все классы пишутся строчными буквами.

**Как должно быть:**
Эти кнопки являются элементами блока `dropdown`, значит:

```html
<button class="dropdown__btn-clean">очистить</button>
<button class="dropdown__btn-apply">применить</button>
```

---

## 6. Элемент `__` там, где нужен модификатор `--`

**Файл:** `ui.html` строка 218, `ui.css` строки 483–497

**Проблема:**

```html
<button class="button__clickBorderOff">click me</button>
```

Это третий стиль кнопки (без рамки и фона). Такие вариации в BEM — это **модификаторы**, и обозначаются через `--`. Но здесь использован `__`, что означает "элемент внутри блока `.button`". Это неверно — кнопка не находится "внутри" другой кнопки.

**Как должно быть:**

```html
<button class="button button--ghost">click me</button>
```

```css
.button--ghost {
  border: none;
  background: white;
  color: #bc9cff;
}
```

Сравни с правильными примерами, которые уже есть в коде:

```html
<button class="button button--outline">click me</button>
<!-- ✓ правильно -->
<button class="button button--fullWidth">...</button>
<!-- ✓ правильно -->
```

**Как это будет использоваться на странице бронирования:**

```html
<!-- Страница выбора номера -->
<div class="room-card__actions">
  <!-- Основное действие -->
  <button class="button button--full-width">Забронировать</button>

  <!-- Второстепенное действие — outline -->
  <button class="button button--outline">Подробнее</button>

  <!-- Третичное действие — без фона и рамки (ghost) -->
  <button class="button button--ghost">Отмена</button>
</div>
```

Все три кнопки — один блок `.button` с разными модификаторами. Один CSS-класс, три внешних вида.

---

## 7. Три почти одинаковых класса вместо одного с модификатором

**Файл:** `ui.html` строки 35, 55, 65, 78, 90, 235, 278; `ui.css` строки 153–162

**Проблема:**

```css
.arrow_button,
.arrow_button-mini,
.arrow_buttonTwo { ... }  /* одинаковые стили у всех трёх */
```

Это три названия для одного и того же компонента — кнопки со стрелкой. Разница только в контексте использования. В BEM для этого есть модификаторы.

**Как должно быть:**

```html
<!-- обычная кнопка-стрелка -->
<button class="arrow-btn">...</button>

<!-- маленькая версия — модификатор -->
<button class="arrow-btn arrow-btn--small">...</button>
```

Тогда в CSS нужен только один блок `.arrow-btn` и один модификатор `.arrow-btn--small`.

---

## 8. Слишком общее имя класса `.container`

**Файл:** `ui.html` строки 101–115, `ui.css` строки 193–249

**Проблема:**

```html
<label class="container">
  <input type="checkbox" />
  <span class="checkmark"></span>
  Можно курить
</label>
```

Слово `container` — одно из самых перегруженных в вёрстке. Оно не описывает компонент. Встретив `.container` в чужом коде, невозможно понять, что это за элемент.

**Как должно быть:**

```html
<label class="checkbox">
  <input type="checkbox" class="checkbox__input" />
  <span class="checkbox__mark"></span>
  Можно курить
</label>
```

**Как это будет использоваться на странице фильтрации номеров:**

```html
<!-- Боковая панель фильтров -->
<aside class="filters">
  <h2 class="filters__title">Удобства</h2>

  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" />
    <span class="checkbox__mark"></span>
    Можно курить
  </label>
  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" />
    <span class="checkbox__mark"></span>
    Можно с питомцами
  </label>
  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" />
    <span class="checkbox__mark"></span>
    Можно пригласить гостей
  </label>
</aside>
```

Компонент `.checkbox` переиспользуется сколько угодно раз — просто дублируется тег, без новых CSS-правил.

---

## 9. Стилизация по тегу внутри компонента вместо классов

**Файл:** `ui.css`, строки 544, 656

**Проблема:**

```css
.dropdown__expander div { ... }
.dropdown__peopleExpander div { ... }
```

BEM требует, чтобы каждый значимый элемент имел свой класс. Стилизация через тег `div` внутри блока — хрупкая: если структура HTML изменится или добавится новый `div`, стили поедут.

**Как должно быть:**
Добавить класс каждому `div` и стилизовать по нему:

```html
<div class="dropdown__row">
  <h3 class="dropdown__title">спальни</h3>
  <div class="dropdown__counter">...</div>
</div>
```

```css
.dropdown__row {
  display: flex;
  gap: 9px;
  justify-content: space-between;
}
```

---

## 10. Дублирование свойств <!--сделано-->

**Файл:** `ui.css`, строки 462 и 466

**Проблема:**

```css
.button {
  text-transform: uppercase;  /* строка 462 */
  ...
  text-transform: uppercase;  /* строка 466 — дубликат! */
}
```

Одно и то же свойство написано дважды. Браузер применит только последнее, первое игнорируется. Это захламляет код и говорит о невнимательности.

**Как исправить:** Удалить одно из двух объявлений.

---

## 11. Мёртвые (неиспользуемые) CSS-правила

**Файл:** `ui.css`

**Проблема — три мёртвых класса:**

```css
/* строка 143 — класса .number_guests нет в HTML */
.number_guests::placeholder { color: var(--Dark-Shade25); }

/* строка 147 — класса .data-mini нет в HTML */
.data-mini { border: none; width: 100%; padding: 13px; }

/* строка 114 — класса .purpose_trip__form нет в HTML */
.purpose_trip__form, ... { position: relative; ... }
```

Также в HTML встречается класс `dropdownInputBad` (строка 234), которого нет в CSS.

**Как исправить:** Удалить неиспользуемые правила из CSS. Для класса `dropdownInputBad` — либо удалить его из HTML и использовать уже существующий `.dropdown__input`, либо добавить стили в CSS.

---

## 12. Два разных блока-обёртки для похожих дропдаунов

**Файл:** `ui.html`, строки 226–266 и 268–313

**Проблема:**

```html
<!-- Первый дропдаун -->
<section class="dropdown">
  <label class="dropdown__rooms">...</label>
</section>

<!-- Второй дропдаун -->
<section class="dropdown__people">
  <label class="dropdown__peoples">...</label>
</section>
```

Первый дропдаун: секция называется `dropdown` (блок), внутри `dropdown__rooms` (элемент).
Второй дропдаун: секция называется `dropdown__people` (как будто элемент блока `dropdown`), но при этом сама является блоком-контейнером.

Это несогласованность: одинаковые компоненты именованы по-разному.

**Как должно быть:**
Использовать один блок `dropdown` с модификаторами для разных вариантов:

```html
<div class="dropdown">
  <span class="dropdown__label">Комнаты и спальни</span>
  <div class="dropdown__trigger">...</div>
  <div class="dropdown__expander">...</div>
</div>

<div class="dropdown dropdown--people">
  <span class="dropdown__label">Гости</span>
  <div class="dropdown__trigger">...</div>
  <div class="dropdown__expander">...</div>
</div>
```

**Как это будет использоваться на странице поиска:**

```html
<!-- Поисковый виджет в шапке -->
<div class="search-widget">
  <div class="date-input">...</div>

  <div class="dropdown">
    <span class="dropdown__label">Комнаты</span>
    <div class="dropdown__trigger">2 спальни, 2 кровати...</div>
    <div class="dropdown__expander">...</div>
  </div>

  <div class="dropdown dropdown--people">
    <span class="dropdown__label">Гости</span>
    <div class="dropdown__trigger">Сколько гостей</div>
    <div class="dropdown__expander">...</div>
  </div>

  <button class="button">Найти</button>
</div>
```

Оба дропдауна используют один и тот же CSS-блок `.dropdown`. Отличие только в модификаторе, который добавляет специфичные стили (например, другой размер или кнопки «применить»/«очистить»).

---

---

## Часть 3. Задания — проблемы HTML-разметки

---

## 13–14. `<label>` как обёртка и `<button>` внутри неё — одна проблема, одно решение

**Файл:** `ui.html`, строки 31–95 (инпуты с кнопкой-стрелкой), строки 227, 269 (дропдауны)

**Проблема:**

```html
<!-- Инпуты -->
<label class="number_guests__form">
  <div>
    <input placeholder="Сколько гостей" />
    <button class="arrow_button">
      <!-- кнопка ВНУТРИ label -->
      <img src="..." />
    </button>
  </div>
</label>

<!-- Дропдауны -->
<label class="dropdown__rooms">
  <div class="dropdown__default">
    <input readonly />
    <button>...</button>
    <!-- та же проблема -->
  </div>
  <div class="dropdown__expander">...</div>
</label>
```

Здесь два нарушения одновременно:

1. **`<label>` как обёртка компонента** — `<label>` в HTML предназначен только для подписи к полю ввода. Браузер связывает его с ближайшим `<input>` внутри: клик в любом месте `<label>` передаёт фокус на этот `<input>`. Использовать `<label>` как структурный контейнер — семантическая ошибка.

2. **`<button>` внутри `<label>`** — `<label>` и `<button>` оба интерактивны. Вкладывать один в другой запрещено спецификацией HTML. Браузеры обрабатывают это по-разному и непредсказуемо.

**Правильная структура — `div`-обёртка и кликабельная зона:**

Всю область триггера (поле + стрелка) делаем единым кликабельным `<div class="dropdown__trigger">`. Стрелка — просто картинка внутри, а не отдельная кнопка. JavaScript из задания 17 навешивает обработчик на `.dropdown__trigger`, поэтому клик работает по всей области.

```html
<!-- Инпут с дропдауном -->
<div class="guests-input">
  <span class="guests-input__label">Количество гостей</span>
  <div class="guests-input__trigger">
    <!-- весь триггер — один div -->
    <input class="guests-input__input" readonly placeholder="Сколько гостей" />
    <img
      class="guests-input__arrow"
      src="./img/arrow_number_guest.png"
      alt=""
    />
    <!-- стрелка — картинка, не кнопка -->
  </div>
  <div class="guests-input__expander">...</div>
</div>

<!-- Дропдаун комнат — та же структура -->
<div class="dropdown">
  <span class="dropdown__label">Комнаты и спальни</span>
  <div class="dropdown__trigger">
    <input
      class="dropdown__input"
      readonly
      placeholder="2 спальни, 2 кровати..."
    />
    <img class="dropdown__arrow" src="./img/arrow_number_guest.png" alt="" />
  </div>
  <div class="dropdown__expander">...</div>
</div>
```

JS из задания 17 находит все `.dropdown__trigger` на странице и открывает родительский блок по клику — без ID, без вложенных кнопок. Подробнее — см. задание 17.

---

## 15. Отсутствует `type="button"` на кнопках

**Файл:** `ui.html`, строки 35, 55, 65, 235, 244, 246, 252, 254, 260, 262 и другие

**Проблема:**

```html
<button class="arrow_button">
  <!-- нет type -->
  <button class="dropdown__minus">-</button>
  <!-- нет type -->
  <button class="dropdown__plus">+</button>
  <!-- нет type -->
</button>
```

По умолчанию у `<button>` атрибут `type="submit"`. Это значит: если кнопка окажется внутри `<form>`, нажатие на неё отправит форму — даже если это просто кнопка `+` у счётчика или стрелка дропдауна.

В коде уже есть правильный пример (строка 278):

```html
<button type="button" class="arrow_buttonTwo"><!-- ✓ правильно --></button>
```

**Как должно быть:**
Для всех кнопок, которые не отправляют форму, всегда писать `type="button"`:

```html
<button type="button" class="arrow-btn">
  <button type="button" class="dropdown__minus">-</button>
  <button type="button" class="dropdown__plus">+</button>
</button>
```

---

<!--
## 16. Неправильный порядок подключения CSS-файлов

**Файл:** `ui.html`, строки 7–9

**Проблема:**

```html
<link rel="stylesheet" href="./styles/ui.css" />

<link rel="stylesheet" href="./styles/globals.css" />

<link rel="stylesheet" href="./styles/variables.css" />

```

`ui.css` подключён **раньше** `variables.css`, но использует переменные из него (`var(--Dark-Shade100)`, `var(--h3-font-size)` и т.д.). Это работает в большинстве браузеров, потому что CSS-переменные вычисляются в момент рендеринга, а не парсинга. Но это неправильный порядок логически и может вызвать проблемы в некоторых ситуациях.

**Правильный порядок — от общего к частному:**

```html

<link rel="stylesheet" href="./styles/variables.css" />

<link rel="stylesheet" href="./styles/globals.css" />

<link rel="stylesheet" href="./styles/ui.css" />
```
-->

## 17. Дропдауны завязаны на конкретные ID — не масштабируется

**Файл:** `scriptui.js`, строки 39–51, 81–98

**Проблема:**

```js
const btn = document.getElementById("arrow_button");
const menu = document.getElementById("mobileMenu");

btn.addEventListener("click", () => menu.classList.toggle("active"));
```

Каждый дропдаун требует уникального ID и отдельного куска JS-кода. Добавишь третий дропдаун на страницу — придётся снова писать те же строки с новыми ID. Это не масштабируется.

Кроме того, `id="menuBtnClose"` — название противоречит себе: элемент открывает дропдаун, а назван «кнопка закрытия».

**Решение — делегирование через BEM-классы и `closest()`:**

Вместо поиска по ID — один универсальный обработчик для всех дропдаунов сразу. HTML-структуру берём из заданий 13–14: обёртка `.dropdown`, триггер `.dropdown__trigger`, панель `.dropdown__expander`:

```html
<!-- Никаких id не нужно — только классы -->
<div class="dropdown">
  <span class="dropdown__label">Комнаты и спальни</span>
  <div class="dropdown__trigger">
    <input class="dropdown__input" readonly placeholder="2 спальни..." />
    <img class="dropdown__arrow" src="..." alt="" />
  </div>
  <div class="dropdown__expander">...</div>
</div>

<!-- Второй дропдаун — тот же HTML, без новых id -->
<div class="dropdown dropdown--people">
  <span class="dropdown__label">Гости</span>
  <div class="dropdown__trigger">
    <input class="dropdown__input" readonly placeholder="Сколько гостей" />
    <img class="dropdown__arrow" src="..." alt="" />
  </div>
  <div class="dropdown__expander">...</div>
</div>
```

```js
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
```

```css
.dropdown__expander {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: 0.3s ease;
}

/* Состояние «открыт» — модификатор на родительском блоке */
.dropdown--open .dropdown__expander {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown--open .dropdown__arrow {
  transform: rotate(180deg);
}
```

Теперь добавить новый дропдаун на любую страницу — это только HTML с классом `.dropdown`. JS-код трогать не нужно.

---

## 18. Кнопки рейтинга недоступны для скринридеров

**Файл:** `ui.html`, строки 170–209

**Проблема:**

```html
<button class="buttonStars">
  <img
    class="buttonsRate__starsBorder"
    src="./img/star_border.svg"
    alt="stars"
  />
  <img class="buttonsRate__stars" src="./img/star.svg" alt="stars" />
</button>
```

Пять одинаковых кнопок, у каждой `alt="stars"`. Пользователь со скринридером услышит: «stars, кнопка» — пять раз подряд. Непонятно, за что отвечает каждая кнопка.

Атрибут `alt` у `<img>` также неточен: он должен описывать смысл изображения в контексте, а не просто «звёзды».

**Как должно быть:**

```html
<button type="button" class="button-star" aria-label="Оценить на 1 звезду">
  <img class="button-star__border" src="./img/star_border.svg" alt="" />
  <img class="button-star__fill" src="./img/star.svg" alt="" />
</button>
<button type="button" class="button-star" aria-label="Оценить на 2 звезды">
  ...
</button>
<button type="button" class="button-star" aria-label="Оценить на 3 звезды">
  ...
</button>
```

Декоративные изображения внутри кнопки с `aria-label` получают пустой `alt=""` — скринридер их пропускает и читает только `aria-label` кнопки.

---

## Шпаргалка по правилам BEM

```
.block {}                    — блок (самостоятельный компонент)
.block__element {}           — элемент (часть блока, не существует без него)
.block--modifier {}          — модификатор блока (вариация внешнего вида или состояния)
.block__element--modifier {} — модификатор элемента

Правила именования:
✓ только строчные буквы
✓ слова разделяются дефисом: .my-block
✗ camelCase: .myBlock
✗ PascalCase: .MyBlock
✗ snake_case: .my_block
```
