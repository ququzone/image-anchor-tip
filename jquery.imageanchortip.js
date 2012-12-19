(function($) {
	var wrapper_style = {
		position : 'absolute',
		left : 0,
		top : 0,
		padding : 0,
		border : 0
	};
	var methods = {
		init : function(options) {
			var settings = $.extend({
				'anchor_image' : 'url("../anchor.png")',
			}, options);

			return this.each(function() {
				var $this = $(this);
				var enterd = false;
				$this.wrap('<div></div>');
				var wrapper = $this.parent().css({
					display : 'block',
					position : 'relative',
					padding : 0,
					width : this.width,
					height : this.height
				});
				wrapper.addClass($this.attr('class'));
				$this.css(wrapper_style);

				var coords = new Array();
				coords[0] = {
					x : 210,
					y : 180
				};
				coords[1] = {
					x : 280,
					y : 55
				};
				for (i in coords) {
					$('<div class="imageanchortip-dot" id="dot-'+i+'"></div>').css({
						'background-attachment' : 'scroll',
						'background-color' : 'transparent',
						'background-image' : settings.anchor_image,
						'background-repeat' : 'no-repeat',
						'border' : 'medium none',
						'box-shadow' : 'none',
						'opacity' : '0',
						'display' : 'block',
						'height' : '31px',
						'margin' : '0',
						'padding' : '0',
						'position' : 'absolute',
						'width' : '31px',
						'z-index' : '166000',
						'left' : coords[i].x,
						'top' : coords[i].y
					}).appendTo(wrapper);
					$('<div class="imageanchortip-pop" id="pop-'+i+'"><div>title</div><div>body<div></div>').css({
						'display' : 'none',
						'background-color' : '#FFFFFF',
						'margin' : '0',
						'padding' : '0',
						'position' : 'absolute',
						'width' : '200px',
						'z-index' : '166000',
						'left' : coords[i].x - 85,
						'top' : coords[i].y + 31
					}).appendTo(wrapper);
				}
				$this.hover(function(event) {
					if (!wrapper.children(".imageanchortip-dot")
							.is(":animated")) {
						enterd = true;
						wrapper.children(".imageanchortip-dot").css('opacity',
								'1');
					}
				}, function(event) {
					enterd = false;
					setTimeout(function() {
						if (!enterd) {
							wrapper.children(".imageanchortip-dot").css(
									'opacity', '0');
							enterd = false;
						}
					}, 100);
				});
				wrapper.children(".imageanchortip-dot").hover(function(event) {
					enterd = true;
					$('#pop-'+$(this).attr('id').substring(4)).show();
				}, function(event) {
					enterd = false;
				});
				wrapper.children(".imageanchortip-pop").hover(function(event) {
				}, function(event) {
					var $pop = $(this);
					setTimeout(function() {
						$pop.hide();
					}, 1000);
				});
			});
		}
	};

	$.fn.imageanchortip = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method
					+ ' does not exist on jQuery.imageanchortip');
		}
	};
})(jQuery);