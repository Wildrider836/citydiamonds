$(function () {

    var obj = $(this);

    if ($(window).width() > 768) {
        $('.navbar-toggle').removeClass('open');
        $('.collapse').show();
        $('.aside').show();
    } else {
        $('body').on('click', '.catalog-icon', function () {
            $('.left_hide').toggleClass('open');
            return false;
        })
        
    }

    
    function fixed() {
    
       
		

        $('.footer').removeAttr('style');
        $('.footer .fixed').removeAttr('style');
        $('.wrapper').removeAttr('style');
        if ($(window).height() >= $('.main_page, .all_page').height()) {
            var fh = $('.footer').height();
            if ($(window).width() < 568 && $('.top_line').length) {
                fh = fh + $('.top_line').height() + 200;
            }
            //console.log("fh=" + fh);
            $('.wrapper').css('padding-bottom', fh + 0);
            $('.footer').css('margin-top', 0 - fh);
            $('.footer .fixed').css('height', fh);
        } else if ($(window).width() < 568 && $('.top_line').length) {
            
            var fh = $('.footer').height();
                fh = fh + $('.top_line').height();
            //console.log("fh=" + fh);
            $('.wrapper').css('padding-bottom', fh + 0);
            $('.footer').css('margin-top', 0 - fh);
            $('.footer .fixed').css('height', fh);
        }
        //window.zoom_int();

        //$('.product_list li .item').removeAttr('style');
        //$('.product_list li .item').css({'width': $('.product_list li .item').width() });
    }
    //fixed();

    $(window).on('resize', function () {
        fixed();
    })
    $(window).on('load', function () {
        fixed();
    })


    
    //window.zoom_int();
    //$('.product_list li .item').removeAttr('style');
    //$('.product_list li .item').css('height', Math.max.apply(null, $('.product_list li').map(function () { return $(this).find('.item').innerHeight() }).get()));



});