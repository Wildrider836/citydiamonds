/**
* ...
* @author ser
* @version 1.0
* @current project forms_elelemets
*/
(function ($) {
    $.fn.forms = function (settings) {
        settings = jQuery.extend({

        }, settings);

        var forms = this;
        
        //select
        var select = {
            name: ".custom_select",
            arrow: "icon glyphicon glyphicon-chevron-down",
        }
        forms.select_init = function (sel) {
            var s = sel.find('select');
            s.hide();
            var template;
            if (s.is("[data-placeholder]")) {
                template = "<div>" + s.attr('data-placeholder') + "<span class=\"" +select.arrow+ "\"></span></div>";
            } else {
                template = "<div>" + s.find(':selected').text() + "<span class=\"" + select.arrow + "\"></span></div>";
            }
            template += "<ul>";
            for (var i = 0; i < s.find('option').length; i++) {
                if (s.find('option:eq(' + i + ')').is(':selected')) {
                    template += "<li class=\"active\"><a href=\"#\">" + s.find('option:eq(' + i + ')').text() + "</a></li>";
                } else {
                    template += "<li><a href=\"#\">" + s.find('option:eq(' + i + ')').text() + "</a></li>";
                }
            }
            template += "</ul>";
            sel.append(template);
        }

        
        $(select.name).each(function (i) {
            forms.select_init($(this));
            $(this).attr('data-id', 'select' + (i+1));
        });

        //$('body').on('mouseleave', select.name, function () { $(this).find('ul').hide() });
        $('body').on('click touchstart', select.name, function () {
           
            var _parent = $(this);
            var _input  = _parent.find('div');
            var _list   = _parent.find('ul');
            _parent.addClass('open');
            _parent.css('z-index', 100);
            _list.css({ top: _input.innerHeight() - 1 });
            _list.slideDown();
        });

        $('body').on('click touchend', select.name + " ul li a", function () {
            var _parent = $(this).parents(select.name);
            var _sel    = _parent.find('select');
            var _list   = _parent.find('ul');
            var value   = $(this).text();
            
            _list.find('li').removeClass('active');
            $(this).parent('li').addClass('active');
            _parent.find('div').html(value + "<span class=\"" + select.arrow + "\"></span>");

            _sel.find('option').each(function () {
                if ($(this).text() == value) {
                    $(this).prop('selected', true);
                }
            })
            _parent.removeClass('open');
            _list.hide();
            _sel.change();

            return false;
        });




        $('body').on('click', '.custom_checkbox, .custom-checkbox, .custom_switch', function () {
            if ($(this).find('input').is(':checked')) {
                $(this).removeClass('active');
                $(this).find('input').prop('checked', false);
            } else {
                $(this).addClass('active');
                $(this).find('input').prop('checked', true);
            }
            if($(this).hasClass('change')){
                $(this).closest('form').submit();
            }
            return false;
        });

        //radiobutton
        $('body').on('click', '.custom_radio, .custom_colorbox', function () {
            var radio = $(this).find('input');
            var group = $(this).find('input').attr('name');
            if ($(this).find('input').is(':checked') && $(this).hasClass('custom_radio')) {
                return false;
            }
            if ($(this).find('input').is(':checked') && $(this).hasClass('custom_colorbox')) {
                $(this).removeClass('active');
                $(this).find('input').prop('checked', false);
                return false;
            }
            if (!$(this).find('input').is(':checked')) {
                $('[name="' + group + '"]').each(function () { $(this).parent().removeClass('active'); });
                $('[name="' + group + '"]').removeAttr('checked');
                if (radio.is("[data-id]")) {
                    $('.radio_description').hide();
                    $(radio.attr("data-id")).show();
                }
                $(this).addClass('active');
                $(this).find('input').prop("checked", true);
                return false;
            }
        });
             


        //upload
        $('body').on('change', '.custom_upload .file', function () {
            $(this).parent().addClass('active');
            $(this).parent().find('input.text').val($(this).val());
        })

        //plus-minus
        $('body').on('click', '.custom_count .next', function () {
            var inp = $(this).closest('.custom_count').find('input');
            inp.val(parseInt(inp.val()) + 1);
            inp.change();
        });
        $('body').on('click', '.custom_count .prev', function () {
            var inp = $(this).closest('.custom_count').find('input');
            if (parseInt(inp.val()) > 0) {
                inp.val(parseInt(inp.val()) - 1);
                inp.change();
            }
        })


        //tabs
        var stab = 0;
        var atab = $('.custom_tab .tab_menu li.active a').attr('href') || 0;
        
        if (atab.length) {
            $('.custom_tab ' + atab + '').show();
            /*if ($('.custom_tab ' + atab + '').attr('data-src').length) {
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 10 && !stab) {
                        tab_load($('.custom_tab ' + atab + '').attr('data-src'), $('.custom_tab ' + atab + ''));
                        stab = 1;
                    }
                })
                
            }*/
        }
        
        $('body').on('click touchend', '.custom_tab .tab_menu li a', function () {
            
            $('.custom_tab .tab').hide();
            $(this).parents('ul').find('li').removeClass('active');
            $(this).parent().addClass('active')
            $($(this).attr('href')).show();
            
            /*if ($($(this).attr('href')).attr('data-src').length && !$($(this).attr('href')).is('[data-load]')) {
                $($(this).attr('href')).addClass('loading');
                tab_load($($(this).attr('href')).attr('data-src'), $($(this).attr('href')));
            }*/
            
            return false;
        })
        
        function tab_load(url, cnt) {

            var jqxhr = $.get(url);

            jqxhr.done(function (page) {
                if (cnt.html() != page) {
                    cnt.html("");
                    cnt.html(page);
                    cnt.attr("data-load", 1);
                    cnt.removeClass('loading');
                }
            })
            jqxhr.fail(function (page) {
                if (url.indexOf(".html") !== -1) {
                    url = url.replace(".html", "");
                    url += ".aspx";
                    tab_load(url, cnt);
                } else {
                    alert("tab load error");
                }
            })
        }

        
    

    //toggle icon
	if ($('.class_toggle').length) {
		$('.class_toggle').removeClass('active');
		$('.class_toggle').each(function () {
			var _a = $(this).find('a');
			if ($('.' + _a.attr('data-target')).hasClass(_a.attr('data-class')) && !$(this).hasClass('active'))
				$(this).addClass('active');
			if ($.cookie('shortview') == 1)
				$('[data-class="gridtview"]').parent().removeClass('active');
		});
		if ($.cookie('shortview') == 1) {
			$('.class_toggle').removeClass('active');
			$('[data-class="shortview"]').parent().addClass('active');
			$('.product_list').removeClass('gridview');
			$('.product_list').addClass('shortview');
		}
		$('body').on('click', '.class_toggle', function () {
			$('.class_toggle').each(function () {
				var _a = $(this).find('a');
				if ($('.' + _a.attr('data-target')).hasClass(_a.attr('data-class')))
					$('.' + _a.attr('data-target')).removeClass(_a.attr('data-class'));
			});
			var _a = $(this).find('a');
			$('.' + $(this).find('a').attr('data-target')).addClass(_a.attr('data-class'));
			$('.class_toggle').removeClass('active');
			$(this).addClass('active');
			if ($('.' + _a.attr('data-target')).hasClass("shortview")) {
				$('.' + _a.attr('data-target')).find('.item').removeAttr('style');
				$.cookie('shortview', '1', { path: "/", expires: 3000 });
			} else {
				$.cookie('shortview', '0', { path: "/", expires: 3000 });
			}

			return false;
		})
	}


        //search panel
    var search_open = false;
    /*
    function search_panel_fix() {
        $('body').stop().on('click touchend', '.custom_search .search', function () {
            
            var search = $(this);
            var _p = $(this).closest('.custom_search');
            var _ww = 558;
            _ww = $(window).width() < 567 ? 225 : _ww;
            if (!search_open) {
                search_open = true;
                search.addClass('active');
                $(this).animate({
                    width: _ww,
                    left: 0 - _ww + 40
                }, 500, function () {
                    $('.custom_search .search .text').focus();
                    

                });

                $('body').append('<div class="custom_overlay"></div>');
                _p.css('z-index', '2000');
                $('.custom_overlay').css('z-index', '1998');
            }
            $('.custom_overlay').css('z-index', '1998');

            $('body').on('click touchend', '.custom_overlay', function () {
                forms.search_close();
            })
            var form = $(this).parents('form');
            if (search.hasClass('active')) {
                window.forms.search_click(form);
            }
            return false;
        })*/
        /*} else {
            $('.custom_search .search').removeClass('active');
            $('.custom_search.search').removeAttr('style');
            $('.custom_search .search .text').val("");
            search_open = false;
        }*/
    //}


    //search_panel_fix();
    
    forms.search_close = function () {
        $('.search').removeAttr('style');
        $('.validator').remove();
        $('.custom_overlay').remove();
        $('.search').removeClass('active');
        search_open = false;
    }
    $(window).scroll(function () {
        if ($('.custom_search').length) {
            if ($(this).scrollTop() > $('.custom_search').offset().top + 100 && search_open) {
                forms.search_close();
            }
        }
        if ($(tooltip.name).length && $(this).scrollTop() > $(tooltip.name).offset().top + $(tooltip.name).outerHeight() + 100) {
            if ($('.custom_overlay').length)
                $('.custom_overlay').remove();
            $(tooltip.name).remove();
        }
    });

    //tooltip
    var tooltip = {
        id: 0,
        name:  ".custom_tooltip",
        hover: "data-tooltip-hover",
        click: "data-tooltip-click",
        data:  "data-tooltip-id"
    }

    //tooltip hover
    $('body').on('mouseover touchstart', '['+tooltip.hover+']', function () {
        $(this).attr(tooltip.data, tooltip.id);
        $(this).css('z-index', '2000');

        forms.createToolTip($(this).attr(tooltip.data), $(this).attr(tooltip.hover));
        tooltip.id++;
    })
    $('body').on('mouseleave', '['+tooltip.hover+']', function () {
        $(tooltip.name).remove();
        $(this).css('z-index', 'auto');
    })
    //tooltip click
    $('body').on('click','['+tooltip.click+']',function () {
        $(this).attr(tooltip.data, tooltip.id);

        if ($(this).attr('data-load') != undefined) {
            forms.load($(this));
            tooltip.id++;
        } else {
            forms.showToolTip($(this), $(this).attr(tooltip.click), "tooltip_click");
            tooltip.id++;
        }
        
        return false;
    })

    forms.showToolTip = function (link, txt, add) {
        
        $('[' + tooltip.data + '="' + $(tooltip.name).attr('data-link') + '"]').css('z-index', '2000');
        $('body').append('<div class="custom_overlay"></div>');
        $('.custom_overlay').css('z-index', '1998');

        $('body').on('click touchend', '.custom_overlay', function () {
            $(this).remove();
            $(tooltip.name).remove();
        });
        forms.createToolTip(link.attr(tooltip.data), txt, add);

        if ($('.scroll').length) {
            $('.scroll').mCustomScrollbar({ theme: "minimal" });
        }
    }
    forms.createToolTip = function (id, txt, add) {
        $(tooltip.name).remove();
        var _template = "";
        if (add != undefined) {
            _template = "<div data-link=\"" + id + "\" class=\"custom_tooltip "+add+"\"><div class=\"arrow\"><div class=\"line\"></div></div>";
        } else {
            _template = "<div data-link=\"" + id + "\" class=\"custom_tooltip\"><div class=\"arrow\"><div class=\"line\"></div></div>";
        }
        _template += "<div class=\"inner\">";
        _template += txt;
        _template += "</div></div>";
        $('body').append(_template);
        forms.posToolTip();
    }

    forms.posToolTip = function () {
        if ($(tooltip.name).attr('data-link') == undefined)
            return

        var _link = $('[' + tooltip.data + '="' + $(tooltip.name).attr('data-link') + '"]');

        var _t = parseInt(_link.offset().top + _link.outerHeight() + 2);
        var _l = parseInt(_link.offset().left) + _link.outerWidth()/2 - $(tooltip.name).outerWidth()/2 + parseInt( _link.css('padding-left'))/2;
        if (($(tooltip.name).outerWidth() + _l) > $(window).width()) {
            _l = _l - (($(tooltip.name).outerWidth() + _l) - $(window).width());
            $(tooltip.name).addClass('r');
        }
        if (($(tooltip.name).outerHeight() + _t) > $(window).height() + $(window).scrollTop() && $(tooltip.name).outerHeight() < (_link.offset().top - $(window).scrollTop())) {
            _t = parseInt(_link.offset().top - 2 - $(tooltip.name).outerHeight());
            $(tooltip.name).addClass('t');
        }
       
        $(tooltip.name).css({ 'top': +_t, 'left': _l, 'z-index' : 2000 });
    }
    
    $(window).resize(function () {
        forms.posToolTip();
    })


    forms.load = function (_link) {
        var url = _link.attr('data-load');
        var jqxhr = $.get(url);
        jqxhr.done(function (page) {
            forms.showToolTip(_link, page, "tooltip_click");
        })
        jqxhr.fail(function (page) {
            if (url.indexOf(".html") !== -1) {
                url = url.replace(".html", "");
                url += ".aspx";
                _link.attr('data-load', url);
                forms.load(_link);
            } else {
                alert("error");
            }
        })
    }


    //form validate
    forms.validateField = function (field) {
        var error = false;
       
        //var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        //var pattern = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([0-9A-Za-z-]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
        var pattern  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        var regphone = /^[0-9\s\-\(\)\+]+$/;

        if (field.attr('type') == 'email' || field.attr('data-type') == 'email') {
            if (pattern.test(field.val()) == false) {
                error = true;
            }
            else {
                error = false;
            }
        } else if (field.attr('type') == 'tel') {
            if (regphone.test(field.val()) == false) {
                error = true;
            }
            else {
                error = false;
            }
        } else if (field.attr('type') == 'checkbox' && field.attr('data-requared') == 'requared') {
            if (!field.is(':checked')) {
                error = true;
            }
            else {
                error = false;
            }
        } else {
            if (field.val() == '' || field.val() == field.attr('text')) {
                error = true;
            }
            else {
                error = false;
            }
        }
        if (field.closest('.custom_select').length) {
            var _sel = field.closest('.custom_select');
            if (_sel.find('div').text() == _sel.find('select').attr('data-placeholder')) {
                error = true;
            } else {
                error = false;
            }
        }


        return error;
    }


    forms.validateForm = function(form, txt) {
        
        var error = 0;
        var error_text = '<span class="error_text">' + txt + '</span>';
        var error_class = 'error';
        var error_tag = $('label>span.error_text, .custom_select>span.error_text');

        form.find(error_tag).remove();
        
        
        form.find('[placeholder*="*"], [data-placeholder*="*"], label:contains("*") .textbox, [data-requared="requared"]').each(function () {
            var label = $(this).closest('label');

            if (forms.validateField($(this))) {
                error = errorTrue(label);
            } else {
                error = errorFalse(label);
            }
        });

        function errorTrue (label) {
            label.addClass(error_class);
            label.append(error_text);
			error = error + 1;
            return error;
        }
        function errorFalse (label) {
            label.removeClass(error_class);
            label.find(error_tag).remove();	
            return error;
        }
       
        return error;
    }

    

    forms.getCurrent = function (el) {
        return $('[data-id="' + el + '"]');
    }

    return this;

};
})(jQuery);    