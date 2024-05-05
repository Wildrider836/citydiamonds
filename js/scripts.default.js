$(function () {

    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Пред',
        nextText: 'След',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
        'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['ru']);


    var obj = $(this);
    /*
    fancybox----------------------------------------------------------*/
    $(".openImg").fancybox();
    
    /*
    form init----------------------------------------------------------*/
    window.forms = $('body').forms();

    /*
    mask init----------------------------------------------------------*/
    $('input[type="tel"]').mask("+7 (999) 999-9999");
    $('.datebox').mask("99.99.9999");

    $( ".datepicker" ).datepicker();

    $('.search-fon').on('click', function(){
        $(this).closest('.search').addClass('active')
        return false;
    })
    

    /*
    lazy load----------------------------------------------------------*/
    /*$('.lazy').lazy();
    
    $('.alazy').lazy({ 
        afterLoad: function(element) {
            window.carusel_int();
        },
    });*/
    
    /*
    slider init----------------------------------------------------------*/

    /*
    top_line init----------------------------------------------------------*/
    
    
    var currentScroll = 0;
    var prevScroll = 0;
    $(window).scroll(function () {
        
        currentScroll = $(this).scrollTop();
        if ($(this).scrollTop() > 50) { $("#scrollUp").show() } else { $("#scrollUp").hide() }
      
        prevScroll = $(this).scrollTop();
        
        if ($(this).scrollTop() > 150) {
            //$('.miniheader').addClass('active');
        } else {
            //$('.miniheader').removeClass('active');
        }

    });
    $('#scrollUp, .top_line a[href="#scrollTop"]').click(function (e) {
        $("body,html").animate({ scrollTop: 0 }, 400);
        return false;
    });
    
    /*
    scroll init----------------------------------------------------------*/
    $('.scroll').mCustomScrollbar({ theme: "minimal" });

  
    


    window.zoom_int = function () {
        if ($('.zoom_container').length) {
            if ($(window).width() < 568) {
                $('.zoom_container').imagezoomsl({
                    zoomrange: [3, 3],
                    zoomstart: 4,
                    innerzoom: true,
                    magnifierborder: "none"
                });
            } else {
                $('.zoom_container').imagezoomsl();
            }

            
            $('.zoom_foto').click(function () {
                $(this).closest('.owl-carousel').find('.item').removeClass("active");
                $(this).closest('.item').addClass("active");

                ///alert()

                var that = this;
                $('.zoom_container').fadeOut(600, function () {
                    $(this).attr("src", $(that).attr("data-med"))
                        .attr("data-large", $(that).attr("data-large"))
                        .fadeIn(1000);
                });
            });
        }
    }
    //window.zoom_int();

   
    /*
    grid auto height----------------------------------------------------------*/
    window.grid_fix = function() {
        //$('.owl-theme-2 .item').css('height', 'auto');
        //$('.owl-theme-2 .item').css('height', Math.max.apply(null, $('.owl-theme-2 .item').map(function () { return $(this).innerHeight() }).get()));


        /*if ($('body').width() < 1300) {

            $('.owl-theme-1 .owl-item').css('height', 'auto');
            $('.owl-theme-1 .owl-item').css('height', Math.max.apply(null, $('.owl-theme-1 .owl-item').map(function () { return $(this).innerHeight() }).get()));

        }*/
    }
    //window.grid_fix();
    

/*
faq item  ------------------------------------------------------------*/
let fin = document.querySelectorAll('.faq-item-name');
[...fin].forEach((fin) => {
    
    fin.addEventListener('click', function(e) {
        let parent = e.target.closest('.faq-item');
        parent.classList.toggle('active');    
    });
});

$('.mmi').on('click', function(){
    if (!$('.menu').hasClass('active')) {
        $('.menu').addClass('active');

        $('body').prepend('<div class="custom-overlay"></div>');

        
    }
    
    return false
})
    
$('.menu .close').on('click', function(){
    if ($('.menu').hasClass('active')) {
        $('.menu').removeClass('active');
        $('.custom-overlay').remove();
    }
    
    return false
})    

$('body').on('click', '.custom-overlay', function(){

    if ($('.menu').hasClass('active')) {
        $('.menu').removeClass('active');
        $('.custom-overlay').remove();
    }
    
    return false
})    



});