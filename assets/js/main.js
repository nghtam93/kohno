$(document).ready(function(){

    // Sticky navbar
    // =========================

    // Custom function which toggles between sticky class (is-sticky)
    var stickyToggle = function (sticky, stickyWrapper, scrollElement,stickyHeight) {
        var stickyTop = stickyWrapper.offset().top;
        if (scrollElement.scrollTop() >= stickyTop &&  scrollElement.scrollTop() >=1 ) {
            stickyWrapper.height(stickyHeight);
            sticky.addClass("is-sticky");
        }
        else {
            sticky.removeClass("is-sticky");
            stickyWrapper.height('auto');
        }
    };
    $('[data-toggle="sticky-onscroll"]').each(function () {
        var sticky = $(this);
        var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
        sticky.before(stickyWrapper);
        // sticky.addClass('sticky');
        var stickyHeight = sticky.outerHeight();
        // Scroll & resize events
        $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
            stickyToggle(sticky, stickyWrapper, $(this),stickyHeight);
        });

        // On page load
        stickyToggle(sticky, stickyWrapper, $(window),stickyHeight);
        // Check scroll top
        var winSt_t = 0;
        $(window).scroll(function() {
            var winSt = $(window).scrollTop();
            if (winSt >= winSt_t) {
                sticky.removeClass("top_show")
            } else {
                sticky.addClass("top_show")
            }
            winSt_t = winSt
        });
    });

    // sticky mb
    var header__stickymb=$(".header")
    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
        $(this).scrollTop()>1?header__stickymb.addClass("sticky__mb"):header__stickymb.removeClass("sticky__mb")
    })


    /*----Get Header Height ---*/
    function get_header_height() {
        var header_sticky = $("header").outerHeight()
        $('body').css("--header-height",header_sticky+'px')
    }
    // setTimeout(function(){ get_header_height() }, 500);
    // $( window ).resize(function() {
    //     setTimeout(function(){ get_header_height() }, 500);
    // });

    // get ScrollBar Width
    function getScrollBarWidth () {
        var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
            widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
        $outer.remove();
        return 100 - widthWithScroll;
    };

    //-------------------------------------------------
    // Menu
    //-------------------------------------------------
    $.fn.dnsearch = function( options ) {

        let thiz = this
        let menu = $(this).attr('data-id')
        let menu_id = '#'+menu

        // Default options
        var settings = $.extend({
            name: 'Menu'
        }, options );

        let ScrollBarWidth = getScrollBarWidth() + 'px';

        // Create wrap
        // Button click
        thiz.click(function(e){
            e.preventDefault()
            if(thiz.hasClass('active')){
                // $('.dnmenu-backdrop').remove()
                $('body').removeClass('modal-open').css("padding-right","")
                $(menu_id).removeClass('active')
                $(thiz).removeClass('active')

            } else {
                $('body').addClass('modal-open')
                $(menu_id).addClass('active')
                $(thiz).addClass('active')
            }
        });

        // Custom close
        $('.js-menu__close').click(function(){
            $('body').removeClass('modal-open')
            $('body').removeClass('modal-open').css("padding-right","")
            $(thiz).removeClass('active')
            $(menu_id).removeClass('active')
        })

        // Apply options
        return;
    };

    $('.js-search-btn').dnsearch()


    //-------------------------------------------------
    // Menu
    //-------------------------------------------------
    $.fn.dnmenu = function( options ) {

        let thiz = this
        let menu = $(this).attr('data-id')
        let menu_id = '#'+menu

        // Default options
        var settings = $.extend({
            name: 'Menu'
        }, options );

        let ScrollBarWidth = getScrollBarWidth() + 'px';

        // Create wrap
        // Button click
        thiz.click(function(e){
            e.preventDefault()
            if(thiz.hasClass('active')){
                // $('.dnmenu-backdrop').remove()
                $('body').removeClass('modal-open').css("padding-right","")
                $(menu_id).removeClass('active')
                $(thiz).removeClass('active')

            } else {
                $('body').addClass('modal-open')
                $(menu_id).addClass('active')
                $(thiz).addClass('active')
            }
        });

        // Custom close
        $('.js-menu__close').click(function(){
            $('body').removeClass('modal-open')
            $('body').removeClass('modal-open').css("padding-right","")
            $(thiz).removeClass('active')
            $(menu_id).removeClass('active')
        })

        // Menu
        var el= $(menu_id).find(".nav__mobile--ul");
        el.find(".menu-item-has-children>a").after('<button class="nav__mobile__btn"><i></i></button>'),

        el.find(".nav__mobile__btn").on("click",function(e){
            e.stopPropagation(),
            $(this).parent().find('.sub-menu').first().is(":visible")?$(this).parent().removeClass("sub-active"):
            $(this).parent().addClass("sub-active"),
            $(this).parent().find('.sub-menu').first().slideToggle()
        })

        // Apply options
        return;
    };

    $('.menu-mb__btn').dnmenu()


    //Select Item
    function dnselect(elm) {
        var dnselect_parent = $(elm).closest('.js-dnselect')
        $(elm).click(function(e) {
            e.preventDefault();
            $(this).closest('.js-dnselect').toggleClass('active');
        })
        $(elm).closest('.js-dnselect').find('li label').on("click",function(e) {
            console.log(1)
            var dnselect_parent = $(this).closest('.js-dnselect')
            var text = $(this).text()


            dnselect_parent.find('li').removeClass('active')
            $(this).closest('li').addClass('active')
            dnselect_parent.removeClass('active')
            dnselect_parent.find('.js-dnselect__label').text(text)
        })
        $('.js-dnselect').mousedown(function(e){ e.stopPropagation(); });

        $(document).mousedown(function(e){ $('.js-dnselect').removeClass('active'); });
    }
    dnselect('.js-dnselect__label')


    // Single

    $('.increment').click(function() {
            var valueElement = $('#'+$(this).siblings('input').attr('id'));

            if($(this).hasClass('plus'))
            {
               valueElement.val(Math.max(parseInt(valueElement.val()) + 1));
            }
            else if (valueElement.val() > 1) // Stops the value going into negatives
            {
               valueElement.val(Math.max(parseInt(valueElement.val()) - 1));
            }

         return false;
    });
});


