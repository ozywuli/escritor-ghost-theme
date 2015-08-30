(function() {

var $menuToggle;
var menuOpened;
var $menu = $('.nav');
var $menuWord = $('.menu-word');

$menuToggle = $('.menu-toggle');
menuOpened = 'nav--opened';


function menuClosed() {
  $('body').removeClass(menuOpened);
  $menuWord.text('Menu');
}

var toggleMenu = {
  init: function() {
    console.log(this);
    $menuToggle.click( toggleMenu.toggleMenu );
  },
  toggleMenu: function(e) {

    e.preventDefault();

    if ($('body').hasClass(menuOpened)) {
      menuClosed();
    } else {
      $('body').addClass(menuOpened);
      $menuWord.text('Close');
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

    if ( !$menu.is(e.target) && !$menu.find('*').is(e.target) && !$menuToggle.find('*').is(e.target) ) {
      if ($('body').hasClass(menuOpened)) {
        menuClosed();
      }
    }

  }
}




$(document).ready(function() {
  toggleMenu.init();
  bodyClick.init();
});



$(function() {

  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'NOV', 'DEC'];

  function renderSite(data) {
    data = $.xml2json(data);
    var posts = data.channel.item;
   
    renderLatestArticles(posts);
  }

  function renderLatestArticles(posts) {
    var $parent = $('.recent-articles__content');
    if(!$parent) {return};

    for(var i = 0; i < Math.min(posts.length, 5); i++) {
      var p = posts[i];
      var date = new Date(p.pubDate);
      var dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      var $a = $('<li class="recent-articles__item"><a href="' + p.link + '"><div class="date">' + dateStr + '</div><h4 class="recent-articles__post">' + p.title + '</h4></a></li>');
      if(i == 4) {
        $a.addClass('last');
      }
      $parent.append($a);
    }
    
    $parent.removeClass('loading');
  }

  $.ajax({
    dataType: 'xml',
    url: '/rss',
    type: 'GET'
  }).success(renderSite);

});




})(jQuery);