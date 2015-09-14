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

    $menuToggle.click( toggleMenu.toggleMenu );
  },
  toggleMenu: function(e) {

    e.preventDefault();

    if ($('body').hasClass(menuOpened)) {
      menuClosed();
    } else {
      $('body').addClass(menuOpened);
      $menuWord.text('Close');
      $menuToggle.removeClass('menu-toggle--post');
      $('.bar').removeClass('bar--post');
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


    if ( !$menu.is(e.target) && !$menu.find('*').is(e.target) && !$menuToggle.is(e.target) && !$menuToggle.find('*').is(e.target) ) {
      if ($('body').hasClass(menuOpened)) {
        menuClosed();
      }
    }

  }
}





$(window).scroll(function() {

  var $headerHeight = $('.site-header').outerHeight();
  var scrolled = $(this).scrollTop();

  if (scrolled > $headerHeight) {
    $menuToggle.addClass('menu-toggle--active');
  } else {
    $menuToggle.removeClass('menu-toggle--active');
  }


});




$(document).ready(function() {
  toggleMenu.init();
  bodyClick.init();

  var $postContent = $(".post__content");
  $postContent.fitVids();

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


    function loopLatestArticles(target, length) {

      length = typeof length !== 'undefined' ? length : posts.length;

      for(var i = 0; i < Math.min(posts.length, length); i++) {
        var p = posts[i];
        var date = new Date(p.pubDate);
        var dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
        var $a = $('<li class="recent-articles__item"><a href="' + p.link + '"><div class="date">' + dateStr + '</div><h4 class="recent-articles__post">' + p.title + '</h4></a></li>');
        if(i == 4) {
          $a.addClass('last');
        }
        target.append($a);
      }
    }


    loopLatestArticles($parent, 5);
    loopLatestArticles($('.archive'));




    $parent.removeClass('loading');





  }

  $.ajax({
    dataType: 'xml',
    url: '/rss',
    type: 'GET'
  }).success(renderSite);

});



// Remove margin from p if it contains a br tag

/*$('p').each(function(){
  if ($(this).html() === "<br>") {
    $(this).css({
      'margin': '0',
      'height': '5px'
    });
  }
});*/


// $('p br:only-child').parent().addClass('break');

})(jQuery);