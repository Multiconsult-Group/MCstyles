var $ = jQuery;

var demoClicks =  function demoClicks(){
  var init, inited, $demoButtons, demoClick;

  init = function init(){
    $demoButtons = $('button.js-demo');
    if(!$demoButtons || !$demoButtons.length)
      return;
    inited = true;

    $demoButtons.on('click', demoClick);
  };

  demoClick = function demoClick(e){
    var $this = $(this);
    var toDo = $this.attr('data-demo');

    $this.siblings('.btn-primary').removeClass('btn-primary').addClass('btn-secondary');
    $this.addClass('btn-primary').removeClass('btn-secondary');

    switch(toDo) {
      case 'navbar-dark':
        $('.navbar').removeClass('navbar-light').addClass('navbar-dark');
        break;
      case 'navbar-light':
        $('.navbar').addClass('navbar-light').removeClass('navbar-dark');
        break;
      case 'navbar-top':
        $('.navbar').addClass('fixed-top').removeClass('fixed-bottom');
        $('body').addClass('navbar-fixed-top').removeClass('navbar-fixed-bottom');
        break;
      case 'navbar-regular':
        $('.navbar').removeClass('fixed-top fixed-bottom');
        $('body').removeClass('navbar-fixed-top navbar-fixed-bottom');
        break;
      case 'navbar-bottom':
        $('.navbar').removeClass('fixed-top').addClass('fixed-bottom');
        $('body').removeClass('navbar-fixed-top').addClass('navbar-fixed-bottom');
        break;
      default:
        console.log('no case for this toDo yet');
    }

  };

  return {
    init: init,
  };
}();

var demoInit =  function demoInit(){
  demoClicks.init();
};

$(document).ready(demoInit);
