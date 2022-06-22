// js script подключен к странице
document.documentElement.classList.add( 'js' );

function enableFocusTrap( el ) {
  let focusableEls = el.querySelectorAll( 'a[href]:not([disabled]), button:not([disabled])' );
  let firstFocusableEl = focusableEls[0];
  let lastFocusableEl = focusableEls[focusableEls.length - 1];

  function handler( e ) {
    let isTabPressed = ( e.key === 'Tab' );

    if ( !isTabPressed ) return;

    if ( e.shiftKey ) {
      if ( document.activeElement === firstFocusableEl ) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if ( document.activeElement === lastFocusableEl ) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  }

  el.addEventListener( 'keydown', handler );

  return handler;
}

function disableFocusTrap( el, handler ) {
  el.removeEventListener( 'keydown', handler )
}

/*

NAVIGATION

*/

let burgerFocusTrapFlag = null;

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
  // Включает ловушку для фокуса
  burgerFocusTrapFlag = enableFocusTrap( nav );
}

// Закрыть меню
function closeMenu( triggerEl, menuEl ) {
  // переключить ариа атрибут
  triggerEl.setAttribute( 'aria-expanded', 'false' );
  // удалить для меню класс open
  menuEl.classList.remove( 'open' );
  // выключает ловушку для фокуса
  disableFocusTrap( nav, burgerFocusTrapFlag );
  burgerFocusTrapFlag = null;
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
    burger.removeEventListener( 'click', handleBurger );
    disableFocusTrap( nav, burgerFocusTrapFlag );
  } else {
    // подключаем обработчики для мобильной версии сайта
    burger.addEventListener( 'click', handleBurger );

    if ( burgerFocusTrapFlag ) {
      enableFocusTrap( nav );
    }
  }
}

// медиа запрос
const mediaQuery = window.matchMedia( '(min-width: 1024px)' );

// подключает обработчик для медиа запросов
mediaQuery.addListener( handleChange );

// если вначале загружается мобильная версия, то подключить обработчики для гамбургера и меню
if ( document.documentElement.clientWidth < 1024 ) {
  burger.addEventListener( 'click', handleBurger );
}

/*

SWIPER "new"

*/

const swiperNew = new Swiper('.new__swiper', {
  slidesPerView: "auto",
  spaceBetween: 18,
  breakpoints: {
    1024: {
      spaceBetween: 20, 
    }
  }
});

/*

SWIPER "all"

*/

const swiperAll = new Swiper('.all__swiper', {
  spaceBetween: 21,
  breakpoints: {
    1024: {
      spaceBetween: 27, 
    }
  }, 
  pagination: {
    el: '.swiper-all__pagination',
    type: 'bullets',
    bulletClass: 'pagination-swiper-all__bullet', 
    bulletActiveClass: 'pagination-swiper-all__bullet--active', 
    clickable: true, 
    currentClass: 'pagination-swiper-all__bullet--current', 
  }, 
  navigation: {
    nextEl: '.swiper-all__button--next',
    prevEl: '.swiper-all__button--prev',
  }, 
});

/*

Modal window

*/

let modalFocusTrapFlag = null;
let prevOpenModalButton = null;

let triggerList = document.querySelectorAll( '.list-slide-swiper-all__button' );
let modalEl = document.querySelector( '.modal' );
let modalImageEl = modalEl.querySelector( '.modal__image' );
let modalCloseButtonEl = modalEl.querySelector( '.modal__button' );
let bodyEl = document.querySelector( 'body' );

function handleOpenModal() {
  let imgEl = this.closest( '.list-slide-swiper-all__image-wrapper' ).querySelector( '.list-slide-swiper-all__image' );
  let src = imgEl.src;
  
  modalImageEl.src = src;
  modalEl.style.display = 'block';
  bodyEl.style.overflow = 'hidden';
  modalCloseButtonEl.focus();
  modalFocusTrapFlag = enableFocusTrap( modalEl );
  prevOpenModalButton = this;
}

function handleCloseModal() {
  modalImageEl.src = '';
  modalEl.style.display = 'none';
  bodyEl.style.overflow = '';
  disableFocusTrap( modalEl, modalFocusTrapFlag );
  prevOpenModalButton.focus();
  prevOpenModalButton = null;
}

triggerList.forEach( trigger => {
  trigger.addEventListener( 'click', handleOpenModal );
} );

modalCloseButtonEl.addEventListener( 'click', handleCloseModal );

/*

SWIPER "testimonials"

*/

const swiperTestimonials = new Swiper('.testimonials__swiper', {
  spaceBetween: 21,
  slidesPerView: 1, 
  autoHeight: true, 
  navigation: {
    nextEl: '.swiper-testimonials__button--next',
    prevEl: '.swiper-testimonials__button--prev',
    disabledClass: 'swiper-testimonials__button--disabled', 
  }, 
});

/*

Валидация формы

*/

let formEl = document.querySelector( '.mailing-list__form' );
let emailEl = document.querySelector( '#user-email' );
let errorEl = document.querySelector( '.form-mailing-list__error' );

function showError() {
  if ( emailEl.validity.valueMissing ) {
    errorEl.classList.add( 'visible' );
    errorEl.textContent = 'Please enter email';
  } else if ( emailEl.validity.typeMismatch ) {
    errorEl.classList.add( 'visible' );
    errorEl.textContent = 'Please enter valid email';
  }
}

emailEl.addEventListener( 'input', () => {
  if ( emailEl.validity.valid ) {
    errorEl.classList.remove( 'visible' );
    errorEl.textContent = '';
  } else {
    showError();
  }
} );

formEl.addEventListener( 'submit', ( e ) => {
  if ( !emailEl.validity.valid ) {
    showError();
    e.preventDefault();
  }
} );