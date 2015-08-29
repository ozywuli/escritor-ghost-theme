(function() {

var $menuToggle;
var menuOpened;
var $menu = $('.nav');

$menuToggle = $('.menu-toggle');
menuOpened = 'nav--opened';


var toggleMenu = {
  init: function() {
    console.log(this);
    $menuToggle.click( toggleMenu.toggleMenu );
  },
  toggleMenu: function() {

    if ($menu.hasClass(menuOpened)) {
      $menu.removeClass(menuOpened);
    } else {
      $menu.addClass(menuOpened);
    }

  }
}


var bodyClick = {
  init: function() {
    $('body').click( 
      bodyClick.closeMenu 
    );
  },
  closeMenu: function(e) {
    console.log(e.target);

    if ( !$menu.is(e.target) && !$menuToggle.find('*').is(e.target) ) {
      if ($menu.hasClass(menuOpened)) {
        console.log(true);
        $menu.removeClass(menuOpened);
      }
    }

  }
}

$(document).ready(function() {
  toggleMenu.init();
  bodyClick.init();
});


})(jQuery);