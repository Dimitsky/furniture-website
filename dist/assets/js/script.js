// js script подключен к странице
document.documentElement.classList.add( 'js' );

/*

NAVIGATION

*/

// навигация 
let nav = document.querySelector( '#main-nav' );
// кнопка открытия меню
let burger = document.querySelector( '.nav-header__hamburger' );
// меню 
let menu = document.querySelector( '#main-menu' );
// фокусируемые элементы в меню (ссылки)
let focusableEls = nav.querySelectorAll( 'a[href]:not([disabled]), button:not([disabled])' );
// первая ссылка
let firstFocusableEl = focusableEls[0];
// последняя ссылка
let lastFocusableEl = focusableEls[focusableEls.length - 1];

// Открыть меню
function openMenu( triggerEl, menuEl ) {
  // переключить ариа атрибут
  triggerEl.setAttribute( 'aria-expanded', 'true' );
  // добавить для меню класс open
  menuEl.classList.add( 'open' );
}

// Закрыть меню
function closeMenu( triggerEl, menuEl ) {
  // переключить ариа атрибут
  triggerEl.setAttribute( 'aria-expanded', 'false' );
  // удалить для меню класс open
  menuEl.classList.remove( 'open' );
}

// Обработчик ловушки фокуса для меню
function handleFocusTrap( e ) {
  // проверяет нажата ли кнопка tab
  let isTabPressed = ( e.key === 'Tab' );

  // если нажата другая кнопка, то ничего не делаем
  if ( !isTabPressed ) return;

  // если пытаемся перейти к предыдущей ссылке
  if ( e.shiftKey ) {
    // если это первая ссылка
    if ( document.activeElement === firstFocusableEl ) {
      // то переходим к последней
      lastFocusableEl.focus();
      // прерываем действие по умолчанию
      e.preventDefault();
    }
  // иначе если пытаемся перейти к следующей ссылке
  } else {
    // если фокус на последней ссылке
    if ( document.activeElement === lastFocusableEl ) {
      // то переходим на первую
      firstFocusableEl.focus();
      // прерываем действие по умолчанию
      e.preventDefault();
    }
  }
}

// обработчик открытия меню
function handleBurger( e ) {
  // true - меню открыто. false - меню закрыто
  let isExpanded = this.getAttribute( 'aria-expanded' ) == 'true' ? true : false;

  // если меню открыто - то закрыть
  if ( isExpanded ) closeMenu( burger, menu );
  // если закрыто - то открыть
  else openMenu( burger, menu );
}

// обработчик медиа запроса
function handleChange( e ) {
  if ( e.matches ) {
    // отключаем обработчики для настольной версии сайта
    menu.removeEventListener( 'keydown', handleFocusTrap );
    burger.removeEventListener( 'click', handleBurger );
  } else {
    // подключаем обработчики для мобильной версии сайта
    menu.addEventListener( 'keydown', handleFocusTrap );
    burger.addEventListener( 'click', handleBurger );
  }
}

// медиа запрос
const mediaQuery = window.matchMedia( '(min-width: 1024px)' );

// подключает обработчик для медиа запросов
mediaQuery.addListener( handleChange );

// если вначале загружается мобильная версия, то подключить обработчики для гамбургера и меню
if ( document.documentElement.clientWidth < 1024 ) {
  menu.addEventListener( 'keydown', handleFocusTrap );
  burger.addEventListener( 'click', handleBurger );
}

/*

SWIPER

*/

const swiper = new Swiper('.new__swiper', {
  slidesPerView: "auto",
  spaceBetween: 18,
  breakpoints: {
    1024: {
      spaceBetween: 20, 
    }
  }
});