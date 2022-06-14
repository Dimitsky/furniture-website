document.documentElement.classList.add( 'js' );

let burger = document.querySelector( '.nav-header__hamburger' );
let menu = document.querySelector( '#main-menu' );

function burgerClickEvent() {
  let isExpanded = this.getAttribute( 'aria-expanded' ) == 'true' ? true : false;

  if ( isExpanded ) {
    this.setAttribute( 'aria-expanded', 'false' );
    menu.classList.remove( 'open' );
  } else {
    this.setAttribute( 'aria-expanded', 'true' );
    menu.classList.add( 'open' );
  }
}

burger.addEventListener( 'click', burgerClickEvent );