# CLAUDE.md — Контекст проекта

## О проекте

Это учебный проект студентки. Цель — создать простую **HTML/CSS Design System** для страниц отеля: набор переиспользуемых примитивных компонентов, построенных по методологии BEM.

Проект **не использует фреймворки** (React, Vue и т.д.) — только чистый HTML, CSS и минимум JavaScript.

## Структура файлов

```
HOTEL/
├── index.html          — пустая/заглушка страница
├── ui.html             — основная страница с демо всех компонентов
├── scriptui.js         — JS для интерактивности (дропдауны, звёзды рейтинга)
├── styles/
│   ├── variables.css   — CSS-переменные: цвета, шрифты
│   ├── globals.css     — сброс стилей браузера
│   └── ui.css          — все стили компонентов (~700 строк)
├── img/                — SVG и PNG иконки (стрелки, звёзды, сердечко)
├── CLAUDE.md           — этот файл
└── TODO.md             — задания студентке по исправлению кода
```

## Текущие (неправильные) имена классов → что должно быть

Компоненты сейчас именованы с ошибками BEM. Для ориентации:

| Сейчас (неправильно) | Должно быть |
|---|---|
| `.text-field` | `.text-input` |
| `.number_guests__form` | `.guests-input` |
| `.data__form`, `.data__form-mini-first` | `.date-input`, `.date-input--mini` |
| `.data__form-filter` | `.date-input--filter` |
| `.data__form-email` | `.date-input--email` |
| `.container` + `.checkmark` | `.checkbox` + `.checkbox__mark` |
| `.button__clickBorderOff` | `.button--ghost` |
| `.arrow_button`, `.arrow_button-mini`, `.arrow_buttonTwo` | `.arrow-btn`, `.arrow-btn--small` |
| `.BtnApply`, `.BtnApplyClean` | `.dropdown__btn-apply`, `.dropdown__btn-clean` |
| `.dropdown__rooms`, `.dropdown__peoples` | `.dropdown`, `.dropdown--people` |
| `.dropdown__defaultPeople` | `.dropdown__trigger` |
| `.dropdown__minusPeople`, `.dropdown__plusPeople` | `.dropdown__minus`, `.dropdown__plus` |
| `class="choice input"`, `class="check box"` | `.inputs-section`, `.controls-section` |

## Компоненты в ui.html

**Инпуты:**
- `.text-field` — текстовое поле (email)
- `.number_guests__form` — поле с кнопкой-стрелкой (выбор гостей)
- `.data__form` — поле с маской даты (ДД.ММ.ГГГГ)
- `.data__form-mini` — два поля даты рядом
- `.data__form-filter` — поле диапазона дат
- `.data__form-email` — поле подписки на email

**Элементы управления:**
- `.container` + `.checkmark` — чекбоксы
- `.radioButtons__form` — радиокнопки
- `.checkbox-ios` — переключатель toggle (CSS-only, на чекбоксе)
- `.buttonsLike` — кнопка лайка (CSS-only, на чекбоксе)
- `.buttonsRate__content` + `.buttonStars` — рейтинг звёздами (JS)

**Кнопки:**
- `.button` — primary
- `.button--outline` — secondary (BEM правильный)
- `.button__clickBorderOff` — tertiary (ошибка BEM: `__` вместо `--`)
- `.button--fullWidth` — на всю ширину (BEM правильный)

**Дропдауны:**
- Дропдаун комнат (спальни / кровати / ванные) — открывается по ID
- Дропдаун гостей (взрослые / дети / младенцы) — с кнопками «применить» / «очистить», открывается по ID

## Роли в проекте

- **Владелец репозитория:** преподаватель (Victor Nov)
- **Автор кода:** студентка, изучает HTML/CSS и методологию BEM

## Приоритеты при анализе кода

1. Корректность BEM-именования — главный приоритет
2. Семантика HTML (`<label>`, `<button>`, `type="button"`)
3. Структура компонентов и переиспользуемость
4. Мёртвый / дублирующийся CSS

## TODO.md — структура заданий

Файл разбит на три части:

**Часть 1 — Теория:**
- Что такое HTML/CSS Design System, как устроен Bootstrap
- BEM подробно: Block, Element, Modifier с примерами
- CSS-only интерактивность через `:checked`

**Часть 2 — BEM-именование (задания 1–12):**
- Два класса вместо одного имени блока (`choice input`)
- Неправильный `__` на самостоятельных блоках (`data__form`)
- `_` вместо `-` в именах блоков
- camelCase в классах (`dropdown__defaultPeople`)
- PascalCase (`BtnApply`)
- `__` вместо `--` для модификатора (`button__clickBorderOff`)
- Три класса вместо одного с модификатором (`arrow_button*`)
- Слишком общее имя `.container`
- Стилизация по тегу вместо класса (`.expander div {}`)
- Дублирование CSS-свойств
- Мёртвые CSS-правила
- Несогласованная структура двух дропдаунов

**Часть 3 — HTML-разметка (задания 13–18):**
- 13–14: `<label>` как обёртка + `<button>` внутри `<label>` — одна проблема, одно решение: `div.dropdown__trigger` с `<img>` стрелкой (не кнопкой)
- 15: Отсутствует `type="button"` на кнопках
- 16: Неправильный порядок подключения CSS-файлов
- 17: Дропдауны завязаны на ID — решение через `querySelectorAll` + `closest()`, модификатор `.dropdown--open`
- 18: Кнопки рейтинга без `aria-label`

**Связь 13–14 и 17:** задания 13–14 задают правильную HTML-структуру (`div.dropdown__trigger`), задание 17 объясняет JS-паттерн поверх этой структуры. Менять их нужно вместе.
