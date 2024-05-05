/**
* ...
* @author ser
* @version 2.0 alpha
* @customDialog
* 
    
$('[title="Форум"]').click(function () {
    var test  = "<h2>customDialog</h2>";
        test += "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi finibus ligula sit amet leo aliquet finibus in quis elit. Donec pharetra pharetra nunc, eget accumsan ante volutpat eget. Sed laoreet nunc ac mi faucibus, eu laoreet sapien finibus. Maecenas posuere ex ut lectus vehicula fermentum. Donec ut semper lectus. Vestibulum egestas hendrerit lorem, ut tincidunt magna commodo vel. Nullam mattis massa in nulla ultrices mollis.</p>";
        test += "<p>Sed gravida rhoncus pulvinar. Nullam non sollicitudin erat. Sed tempus tempor elit ut pulvinar. Fusce lorem purus, porttitor rhoncus diam a, convallis lobortis metus. Phasellus vitae interdum nulla. Proin augue lacus, mollis vel commodo quis, scelerisque eget massa. Nunc euismod felis ut elit luctus dapibus. Fusce vulputate augue sit amet elit blandit suscipit. Integer finibus turpis lacus, ac tincidunt tellus rhoncus sollicitudin. Vivamus commodo urna augue, sit amet dignissim leo ultricies a. Sed aliquam, risus ut sodales dignissim, felis purus faucibus tortor, et tincidunt nibh turpis ac nunc. Integer sed nunc ac mi tempus facilisis. Quisque a metus velit. Ut et lectus dolor. Etiam ut dictum diam, et mollis tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>";
        test += "<p>Nullam id semper nisi. Integer nisl libero, mattis vel tellus sit amet, euismod suscipit augue. Cras eu fringilla ipsum, in cursus augue. Aliquam id nisl eget turpis aliquet efficitur posuere vitae purus. Nam laoreet neque in nunc vehicula, ac laoreet nulla auctor. Sed euismod urna quam, vitae varius nulla sagittis a. Phasellus ultrices leo a dui pharetra, id sagittis lacus dapibus. Proin laoreet magna diam, eget finibus mi facilisis quis. Quisque in magna lobortis, lacinia turpis vel, laoreet quam. Nullam lacus nisi, semper sed dolor sed, mollis varius velit. Phasellus odio metus, dictum vel turpis at, finibus vehicula nisl. Pellentesque vel volutpat orci. Aliquam tempus, turpis auctor blandit gravida, magna est vehicula sapien, non malesuada leo est et turpis. Quisque dapibus tortor vitae auctor sodales.</p>";
        test += "<p>Donec vulputate sagittis fermentum. Mauris ac suscipit elit. Suspendisse bibendum nunc ut sapien ullamcorper bibendum. Fusce id aliquet ipsum, ut cursus lectus. Fusce non egestas erat. Quisque ultrices neque sed ipsum commodo molestie. Integer in lectus a nibh viverra vulputate id iaculis sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a est at lacus viverra hendrerit id nec risus. Sed nisi nulla, rhoncus vel eros eu, lacinia fringilla nibh. Nam quis sodales tortor. Nullam at cursus enim, sed interdum risus. Integer diam sapien, dapibus in felis vitae, tincidunt volutpat nisi. Maecenas at tellus sed mauris faucibus vestibulum a sed eros. Ut id condimentum quam.</p>"
                    
        var d = $('body').customDialog('addButton', "Кнопка 2");
         
        d.show(test);
        d.addButton("Кнопка 1").click(function () { alert("Действие кнопки 1"); });
        d.addButton("Кнопка 2").click(function () { d.append('<br /><br /> Действие кнопки 2') });
        d.addButton("Закрыть").click(function () { d.close(); });

        d.append('<p style="color: red">Сообщение успешно отправленно</p>');
                    
    return false;
});

$('[href="/authorization.aspx"]').click(function () {
    $('#call_dialog').customDialog().show();
    return false;
});
*/

(function ($) {

   

    $.fn.customDialog = function (settings) {
        settings = jQuery.extend({
            link: "",
            width: 650,
            form: null,
            addClass: "",
            onInit: null,
            onClose: null,
            onLoad: null,
            showClose: true
        }, settings);

        var dialog = this;
        var link = $(settings.link);
        var parentTemplate = $(this).parent();
        var sourceTemplate = $(this);
        var obj;
        var z = 2005;
        this.state = "none";
        
        dialog.top = 10;

        function setTempalte() {
            if ($(dialog).prop("tagName") == "BODY") {
                dialog.template = "<div class=\"open_dialog " + settings.addClass + "\" ";
                dialog.template += getId();
                dialog.template += "><div class=\"inner\">";
                if (settings.form != null && settings.form != "")
                    dialog.template += "<form action=\"#\" name=\"" + settings.form + "\" id=\"" + settings.form + "\">";
                if (settings.showClose) dialog.template += "<a href=\"#\" class=\"close\"><span>&times;</span></a>";
                    dialog.content = dialog.content == null ? "<h2>Всплывающее окно</h2><p>Содержимое всплывающего окна</p>" : dialog.content;
                dialog.template += dialog.content;
                if (settings.form != null && settings.form != "") dialog.template += "</form>"
                dialog.template += "</div><div class=\"fl\"></div></div>";

                $('body').append(dialog.template);
                obj = $("#" + dialog.id);

                if (!$('.dialog_overlay').length) {
                    var h = $('body *:first-child').height() > $('body').height() ? $('body *:first-child').height() : $('body').height();
                    h = $('.all_page, .main_page').height() > h ? $('.all_page, .main_page').height() : h;
                    $('body').append('<div class="dialog_overlay" style="height:' + h + 'px"></div>');
                }

            } else {
                //dialog.id = sourceTemplate.attr('id');
                if (settings.showClose) sourceTemplate.append("<a href=\"#\" class=\"close\"><span>&times;</span></a>");
                sourceTemplate.addClass('open_dialog');
                sourceTemplate.addClass(settings.addClass);
                sourceTemplate.removeAttr('style');
                obj = sourceTemplate;
            }
            
        }


        link.on('click', function () {
            dialog.show();
            return false;
        });
       
        function getId() {
            dialog.id = getGuid()
            if (/^\#/.test(link.attr("href")))
                dialog.id = link.attr("href").replace("#", "");
             else if (link.attr("data-id")) 
                 dialog.id = link.attr("data-id");
            if ($(dialog).prop("tagName") != "BODY") dialog.id = sourceTemplate.attr("id");
            return "id=\"" + dialog.id + "\"";
        }


        function getGuid() {
            return "dialog" + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        this.init = function () {
           setTempalte();
           obj.find('.close').on('click', function () { dialog.close(); return false });
           obj.find('.close_dialog').on('click', function () { dialog.close(); return false });
           this.state = "init";
       }
       this.show = function (str) {
           var h = $('body *:first-child').height() > $('body').height() ? $('body *:first-child').height() : $('body').height();
           h = $('.all_page, .main_page').height() > h ? $('.all_page, .main_page').height() : h;
           
           if ($('.dialog_overlay').length) {
               z = parseInt($('.open_dialog').css("z-index")) + 10;
               $('body').append('<div class="dialog_overlay z' + z + '" style="height:' + h + 'px; z-index:' + z + '"></div>');
               $('.z'+z).click(function () { dialog.close(); });
           } else {
               $('body').append('<div class="dialog_overlay" style="height:' + h + 'px"></div>');
               $('.dialog_overlay').click(function () { dialog.close(); });
           }
           
           dialog.content = str || dialog.content;
           dialog.init();

           var dw = settings.width > $(window).width() ? $(window).width() : settings.width;
           obj.css({ 'width': dw });
           dialog.pos(true);
           $(window).on("resize", function () { dialog.pos(false) });
           
           dialog.scroll();

           this.state = "show";
           if (settings.onInit != null) settings.onInit(obj, link);
       }

       
       this.scroll = function () {
           if ($.fn.mousewheel) {
               obj.on("mousewheel", function (e) {
                   if (obj.outerHeight() > $(window).height()) {
                       var w = $(window);
                       if (e.originalEvent.deltaY > 0) {
                           t = obj.offset().top - 20;
                           t = t > ($(window).height() - obj.outerHeight() + w.scrollTop()) ? t : ($(window).height() - obj.outerHeight() + w.scrollTop());

                           obj.css({ 'top': t });
                       } else {
                           t = obj.offset().top + 20;
                           t = t < w.scrollTop() ? t : w.scrollTop();
                           obj.css({ 'top': t });
                       }
                       e.stopPropagation();
                       e.preventDefault();
                   }
               });
           }

       }
       this.isLoad = 0;
       this.load = function (url) {
           var jqxhr = $.get(url);
           dialog.isLoad = 1;
           
           jqxhr.done(function (page) {
              dialog.content  = page;
              dialog.init();
            
              var dw = settings.width > $(window).width() ? $(window).width() : settings.width;
              obj.css({ 'width': dw });

              dialog.scroll();
              if (settings.onLoad != null) settings.onLoad(obj);
              $('body').on('click', '.dialog_overlay', function () { dialog.close() });
              dialog.pos(true);
              $(window).on("resize", function () { dialog.pos(false) });
              dialog.isLoad = 0;

          })
          jqxhr.fail(function (page) {
              if (url.indexOf(".html") !== -1) {
                  url = url.replace(".html", "");
                  url += ".aspx";
                  dialog.load(url);
              } else {
                  alert("error");
              }
          })
       }
       
       this.pos = function (open) {
           var l = obj.parent().width() / 2 - obj.outerWidth() / 2;
           var w = $(window);
           var t = (w.height() - obj.outerHeight()) / 2 + w.scrollTop();
           if (w.scrollTop() > 0) {
               t = (w.height() - obj.outerHeight()) / 2 + w.scrollTop();
           }
           t = t < 0 ? 0 : t;
           if (open) {
                if (obj.hasClass('mobile_menu_d')) {
                    obj.css({ 'display': 'block', 'position': 'absolute', 'top': t, 'opacity': 0, 'z-index': z+1 });
                } else {
                    obj.css({ 'display': 'block', 'position': 'absolute', 'left': l, 'top': t, 'opacity': 0, 'z-index': z+1 });   
                }
                obj.animate({
                opacity: 1
                }, 500);
            } else {
                if (obj.hasClass('mobile_menu_d')) {
                    obj.css({ 'position': 'absolute', 'top': t, 'opacity': 1, 'z-index': z + 1 });
                } else {
                    obj.css({ 'position': 'absolute', 'left': l, 'top': t, 'opacity': 1, 'z-index': z + 1 });
                }
            }



           
           if (this.state != "close") $('body').css('overflow', 'hidden');
          
           //console.log("pos")
       }

       this.close = function () {
           if (obj != undefined) {
               if ($('.dialog_overlay').hasClass('z'+z)) {
                   $('.z' + z).remove();
                   _key = 0;
               } else  {
                   if ($('.dialog_overlay').length == 1) $('.dialog_overlay').remove();
               }

               
               if ($(dialog).prop("tagName") != "BODY") {
                   obj.removeAttr('class');
                   obj.removeAttr('style');
                   obj.css({ 'display': 'none' });
               } else {
                   obj.remove();
                   if (settings.onClose != null) settings.onClose();
                   parentTemplate.append(sourceTemplate);
               }
           }
           
           $('body').css('overflow', 'auto');
           this.state = "close";
        }

        this.addButton = function (name) {
            if (obj != undefined) {
                var source = obj.find('form').length ? obj.find('form') : obj;
                if (source.find('.submit_button').length) {
                    var but = $('<input type="button" value="' + name + '" />').appendTo(source.find('.submit_button'));
                    dialog.pos();
                    return but;
                } else {
                    source.append('<div class="submit_button"></div>');
                    return dialog.addButton(name);
                }
            }
        }

        this.append = function (str) {
            if (obj != undefined) {
                var source = obj.find('form').length ? obj.find('form') : obj;
                if (source.find('.submit_button').length)
                    source.find('.submit_button').before(str);
                else
                    source.append(str);
                dialog.pos();
            }
        }

        return this;
    };
})(jQuery);    