$(function () {
    
    window.dialog_array = [];
    
    $('body').on('click', '[data-link="dialog"]', function () {
        var dw = 620;
        var id = $(this).attr('data-id');
       
        dw = id == "call_reg" ? 700 : dw;
        dw = id == "call_dialog3" ? 700 : dw;
        dw = id == "call_d" ? 850 : dw;

        
        
        function dialog_load(url)
        {
            var jqxhr = $.get(url);

            jqxhr.done(function (page) {
                var d;
                if (id == "call_status") {
                    d = $('body').customDialog({ width: dw, id: $(this).attr('href'), addClass: "open_white"  });
                } else if (id == "call_menu") {
                    d = $('body').customDialog({ width: 480, id: $(this).attr('href'), addClass: "mobile_menu_d"  });
                } else  {
                    d = $('body').customDialog({ width: dw, id: $(this).attr('href')  });
                }

                $('.open_dialog').remove();
                $('.dialog_overlay').remove();

                d.show(page);
                window.dialog_array[id] = d;
                $('input[type="tel"]').mask("+7 (999) 999-9999");
                $('.datebox').mask("99.99.9999");
                
                $( ".datepicker" ).datepicker();

                $('.scroll').mCustomScrollbar({ theme: "minimal" });
                
            })
            jqxhr.fail(function (page) {
                if (url.indexOf(".html") !== -1) {
                    url = url.replace(".html", "");
                    url += ".aspx";
                    dialog_load(url);
                } else {
                    alert("error");
                }
            })

        }
        dialog_load($(this).attr('data-src'));
        return false;
    })

    

    $('body').on('click', '.submit_button>*', function () {
        
        var error = false;
        var form = $(this).parents('form');
        var error_text = "Пожалуйста, введите корректные данные";


        error = window.forms.validateForm(form, error_text);
        
        if (error == false) {
            //var str = form.serialize();
            //str += '&contacts=Y';
            //$.post('/inc/ajax.php', str, function (data) {
            //if (data != false) {
            //form[0].reset();
            //var dialog = $(this).parents('.open_dialog').attr('id');
            //window.dialog_array[dialog].close();
            

            if($(this).attr('href') == '#to_basket') {
                var dialog = $(this).parents('.open_dialog').attr('id');
                var text = "<div class=\"inner2\"><div class=\"h2\">Сообщение отправлено!</div>";
                text += "<p>Заявка принята автоматически. Наш менеджер оперативно свяжется с Вами в самое ближайшее время. Пример и образец текста.</p>";
                
                text += "<div class=\"submit_button\" style=\"text-align:center;margin:20px auto;\"><a class=\"close\" href=\"#\">Хорошо</a></div>";

                text += "</div>";
                var d = $('body').customDialog({ width: 500, addClass: 'noresize' });
                d.show(text);
            }

            
        }
            //});
        //}
        return false;
    });

    
    $('body').on('click', '#subscription [type="submit"]', function(){

        var text = "<div class=\"inner2\"><div class=\"h2\">Спасибо!</div>";
                text += "<p>Ваше сообщение отправлено, мы перезвоним в течение N минут</p>";
                text += "<div class=\"submit_button_small\" style=\"text-align:center;margin:20px auto;\"><a class=\"close\" href=\"#\">Отлично</a></div>";
                text += "</div>";
                var d = $('body').customDialog({ width: 500, addClass: 'noresize' });
                d.show(text);

        return false;
    })


    var slider_max = [0, 100];
    if ($('.start_inp').val() < slider_max[0] && $('.start_inp').val() > slider_max[1]) {
        $('.start_inp').val(slider_max[0]);
        $('.start_inp').attr('data-old', $('.start_inp').val());
    }
    if ($('.end_inp').val() < slider_max[0] && $('.end_inp').val() > slider_max[1]) {
        $('.end_inp').val(slider_max[1]);
        $('.end_inp').attr('data-old', $('.end_inp').val());
    }

    $("#slider").slider({
        range: true,
        values: [$('.start_inp').val(), $('.end_inp').val()],
        max: slider_max[1],
        min: slider_max[0],

        slide: function (event, ui) {
            $('.start_inp').val(ui.values[0]);
            $('.start_inp').attr('data-old', ui.values[0]);
            $('.end_inp').val(ui.values[1]);
            $('.end_inp').attr('data-old', ui.values[1]);
        },

    });


});