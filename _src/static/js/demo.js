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
    e.stopPropagation();
    var $this = $(this);
    var toDo = $this.attr('data-demo');

    if($this.parents('.btn-group').length) {
      $this.siblings('.btn-primary').addClass('btn-secondary').removeClass('btn-primary');
      $this.addClass('btn-primary').removeClass('btn-secondary');
    }

    switch(toDo) {
      case 'navbar-dark':
        $('.navbar').addClass('navbar-dark').removeClass('navbar-light');
        break;
      case 'navbar-light':
        $('.navbar').addClass('navbar-light').removeClass('navbar-dark');
        break;
      case 'navbar-grey':
        $('.navbar').removeClass('navbar-dark navbar-light');
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
        $('.navbar').addClass('fixed-bottom').removeClass('fixed-top');
        $('body').addClass('navbar-fixed-bottom').removeClass('navbar-fixed-top');
        break;
      case 'navbar-side-toggle':
        $('.navbar-side').toggleClass('show');
        $this.toggleClass('btn-primary btn-secondary');
        break;
      case 'navbar-side-left':
        $('.navbar-side').removeClass('navbar-side-right');
        break;
      case 'navbar-side-right':
        $('.navbar-side').addClass('navbar-side-right');
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
