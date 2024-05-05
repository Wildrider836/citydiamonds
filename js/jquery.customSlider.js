/**
* ...
* @author ser
* effect -planking
*        -boxsize
*/
(function($) {
    $.fn.customSlider = function (settings) {
        settings = jQuery.extend({
            pause: 6000,
            pager: true,
            arrows: true,
            resize: true,
            loader: true,
            width: 1920,
            effect: { "name": "default", "parts": 0, "speed": 1000 }
    }, settings);

        var obj = $(this);
        var slides = obj.find('li');
        var speed = settings.effect.speed;
        var pause = settings.pause;
        var auto = true;
        var pager = settings.pager;
        var arrow = settings.arrows;
        var current = 0;
        var minWidth = settings.width;

        var po;
        var timeoutId;
        var _an;

        var keyPause = true;

        getEffect("create");
        
        if (auto) show(current);
        if (pager && slides.length > 1) createPager();
        if (arrow) createArrow();
        if (settings.loader) createLoader();


        function getEffect(type, args) {
            var _s = settings.effect.name;
            var name = type + _s.charAt(0).toUpperCase() + _s.substr(1);
            if (args == undefined) {
                eval(name)();
            } else {
                eval(name)(args);
            }
        }


        function createPager() {
            obj.parent().append('<ul class="slider_pager"></ul>');
            po = obj.parent().find('.slider_pager');
            obj.children('li').each(function (i) {
                po.append('<li><a href="#">'+ i +'</a></li>');
            });
            setPager(0);
            po.find('a').click(function () {
                clearInterval(_an);
                clearTimeout(timeoutId);
                getEffect("end", current);
                current = $(this).parent().index();
                setPager(current)
                show(current);
                return false;
            });
            
        }
        function createLoader() {
            if (slides.length > 1) {
                obj.parent().append('<div class="loader"><div></div></div>');
            }
        }
        function createArrow() {
            if (slides.length > 1) {
                obj.parent().append('<a href="#" class="prev"></a><a href="#" class="next"></a>');
                obj.parent().find('a.next').click(function () {
                    arrowClick(true);
                    return false;
                });
                obj.parent().find('a.prev').click(function () {
                    arrowClick(false);
                    return false;
                });
            }
        }

        function arrowClick(forward) {
            clearInterval(_an);
            clearTimeout(timeoutId);
            getEffect("end", current);
            var next = (forward) ? getNext(current) : next = getPrev(current);
            setPager(next);
            show(next);
            current = next;
        }

        
		obj.swipe({
			swipeLeft: function (event) {
				var next = getNext(current);
				setPager(next);
				show(next);
				current = next;
			},
			swipeRight: function (event) {
				var next = getPrev(current);
				setPager(next);
				show(next);
				current = next;
			}
		});
        function show(index) {
            if (settings.loader) {
                obj.parent().find('.loader div').stop();
                obj.parent().find('.loader div').css('width', '0px');
            }
            getEffect("state", index);
            
            slides.css({ 'z-index': 1 });
            slides.eq(index).css({ 'z-index': 2 })
            if (slides.eq(index).find('img').attr('src') != undefined) {
                if (slides.eq(index).find('img').attr('src').indexOf(".gif") >= 0) {
                    var temp = slides.eq(index).find('img').attr('src');
                    d = new Date();
                    slides.eq(index).find('img').remove();
                    var img = new Image();
                    img.src = temp + "?" + d.getTime();
                    slides.eq(index).append(img);
                }
            }

            getEffect("animate", index);
            setPager(index);
        }

        function delAttr_rcl(prmName, val) {
            var res = '';
            var d = val.split("?");
            var base = d[0];
            return base;
        }

        function getRandomArbitary(min, max) {
            return Math.floor( Math.random() * (max - min) + min );
        }

        function setPager(index) {
            if (po != undefined && index != undefined) {
                po.find('li').removeClass('current');
                po.find('li:eq(' + index + ')').addClass('current');
            }
        }

        function getNext(index) {
            return (index < slides.length - 1) ? index+1 : 0;
        }

        function getPrev(index) {
            return (index > 0) ? index - 1 : slides.length - 1;
        }
      
        function setPause() {
            var index = current;
            clearTimeout(timeoutId);
            current = getNext(index);

            if (auto && slides.length > 1 && keyPause) show(current);
            
        }
        function showPause(hover) {
            var dpause = pause;
            var _dw = 0;
            var _hover = hover || false;
            if (_hover) {
                _dw = obj.width() - (obj.width() - obj.parent().find('.loader div').width());
                _dw = _dw >= obj.width() ? 0 : _dw;

                if (_dw > 0) {
                    dpause = parseInt( pause * ((obj.width() - _dw) / obj.width()) );
                }
            }
            if (settings.loader) {
                obj.parent().find('.loader div').css('width', _dw + 'px');
                obj.parent().find('.loader div').stop().animate({
                    'width': '100%'
                }, dpause, function () {
                    // Animation complete.
                    setPause();
                });
            } else {
                timeoutId = setTimeout(setPause, dpause);
            }
        }
        if (settings.loader) {
            obj.on('mouseover', function () {
                obj.parent().find('.loader div').stop();
                keyPause = false;
            })
            obj.on('mouseleave', function () {
                keyPause = true;
                showPause(true);
            })
        }

        getEffect("fixed");


        //default
        function createDefault(index) {
            slides.find('.img').each(function () {
                //var _url = $(this).find('img').attr('src');
                //$(this).attr('style', 'background-image: url(' + _url + ')');
                var _url = $(this).attr('data-src');
                $(this).attr('style', 'background-image: url(' + _url + ')');
                obj.parent().removeClass('loading')
                
            });
            slides.attr
            slides.find('.img_2').each(function () {
                //var _url = $(this).find('img').attr('src');
                //$(this).attr('style', 'background-image: url(' + _url + ');');
                positionDefault($(this));
            })
        }

        function positionDefault(element) {
            if (element.length > 0) {
                var _pos = element.attr('data-position');
                _pos = _pos.split(':')[0];
                _pos = _pos == "left" ? "-100%" : "200%";
                element.css({ 'background-position': '' + _pos + ' 0' });
            }
        }

        function stateDefault(index) {

            var next = getNext(index);
            var prev = getPrev(index);
            
            slides.find('.description').hide();
            slides.eq(index).hide();
            slides.not(':eq(' + prev + ')').hide();

            positionDefault(slides.eq(index).find('.img_2'));
        }
        function endDefault(index) {
        }
        function animateDefault(index) {
            slides.eq(index).fadeIn(speed, function (e) {
                slides.eq(index).find('.description').show();
                showPause();
                slides.eq(index).find('.description').fadeIn();
                if (slides.length > 1) slides.eq(getPrev(index)).hide();
            });
        }
        function fixedDefault() {

            var _h = Math.round($(window).width() * (parseInt(obj.find('.img').attr('data-height')) / parseInt(obj.find('.img').attr('data-width'))));
            //$('.custom_slider').css('height', _h);
            
            //var _l = ($('body').width() - 1200) / 2;
            //_l = _l > 0 ? _l : 0; 
            //slides.find('.description').css({'left': _l});

            //var _r = (($('body').width() - 1100) / 2) - 10;
            //_r = _r > 0 ? _r : -10;
            //if (po != undefined) po.css('left', _l);

            

        }
        

        //zoom
        function createZoom(index) {
            createDefault(index);
        }
        function stateZoom(index) {
            var next = getNext(index);
            var prev = getPrev(index);

            slides.find('.description').hide();
            slides.eq(index).find('.img').css({ 'scale': '1.2', 'opacity': '0' });
            slides.not(':eq(' + prev + ')').find('.img').css({ 'scale': '1.2', 'opacity': '0' });

            positionDefault(slides.eq(index).find('.img_2'));
        }
        function endZoom(index) {
            slides.eq(index).find('.img').css({ 'scale': '1', left: '0', top: '0', 'opacity': '1' });
        }
        function animateZoom(index) {

            slides.eq(index).find('.img').stop().transition({ scale: 1, top: 0, left: 0, opacity: 1 }, settings.effect.speed, 'ease', function () {
                showPause();
                if (slides.eq(index).find('.img_2').length > 0) {
                    var _pos = slides.eq(index).find('.img_2').attr('data-position');
                    _pos = _pos.split(':')[1];
                    slides.eq(index).find('.img_2').stop().animate({
                        'background-position': _pos
                        
                    }, 1000, function () {
                        // Animation complete.
                    });
                }

                slides.eq(index).find('.description').fadeIn();
            });

        }
        function fixedZoom() {
            fixedDefault();
        }

       
        $(window).resize(function () {
            getEffect("fixed");
        });

        
};
})(jQuery);

$.fn.random = function () {
    return this.eq(Math.floor(Math.random() * this.length));
}