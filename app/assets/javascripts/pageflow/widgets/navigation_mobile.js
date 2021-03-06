/*global IScroll*/

(function($) {
  $.widget('pageflow.navigationMobile', {
    _create: function() {
      /* mobile version */
      var that = this,
        scroller;

      var goToPage = function () {
        var a = $('a', this),
          id = a.attr("data-link");

        if (id !== undefined) {
          pageflow.slides.goToById(id);
          $('.navigation_mobile').removeClass('active');
        }
        else {
          window.open(a.attr('href'), '_blank');
          a.preventDefault();
        }
      };

      $('body').on('touchstart mousedown MSPointerDown', function(event) {
        if (that.element.hasClass('active') && !$(event.target).parents().filter(that.element).length) {
          that.element.removeClass('active imprint sharing');
        }
      });

      $('.menu.index', that.element).click(function() {
        if(!$(that.element).hasClass('sharing') && !$(that.element).hasClass('imprint')) {
          $(that.element).toggleClass('active');
        }
        $(that.element).removeClass('imprint sharing');
      });
      $('.menu.sharing', that.element).click(function() {
        $(that.element).addClass('sharing');
        $(that.element).removeClass('imprint');
      });
      $('.menu.imprint', that.element).click(function() {
        $(that.element).addClass('imprint');
        $(that.element).removeClass('sharing');
      });

      $('.wrapper', this.element).each(function() {
        scroller = new IScroll(this, {
          mouseWheel: true,
          bounce: false,
          probeType: 3
        });

        $('ul', that.element).pageNavigationList({
          scroller: scroller
        });

        scroller.on('scroll', function() {
          $('li', that.element).removeClass('touched').off('touchend mouseup MSPointerUp', goToPage);
        });

        $('.menu', that.element).click(function() {
          scroller.refresh();
        });

        $('li', that.element).each(function() {
          $(this).on({
            'touchstart mousedown MSPointerDown': function() {
              $(this).addClass('touched');
              $(this).one('touchend mouseup MSPointerUp', goToPage);
            },
            'touchend mouseup MSPointerUp': function() {
              $(this).removeClass('touched');
            }
          });
        });
      });
    }
  });
}(jQuery));
