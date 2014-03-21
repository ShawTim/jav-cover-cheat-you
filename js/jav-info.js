(function($) {

	var pl_url = "http://pics.dmm.co.jp/digital/video/%s/%spl.jpg";
	var pic_url = "http://pics.dmm.co.jp/digital/video/%s/%sjp-%d.jpg";
	var img = $("<img>");
	var div = $("<div></div>");
	var a = $("<a></a>");

	$.fn.jav_info = function(options) {

		options = $.extend({
			btn: "#btn",
			code: "#code",
			container: "#container"
		}, options);

		$(options.btn).click(function() {
			if ($(options.code).val().match(/[^\d]\d{3}$/g)) {
				$(options.code).val($(options.code).val().replace(/(\d{3})$/, "00$1"));
			}

			$(options.container).html("");

			var pl_img = img.clone();
			pl_img.attr("src", pl_url.replace(/%s/g, $(options.code).val()));
			var pl_a = a.clone();
			pl_a.attr("href", pl_img.attr("src"));
			pl_a.attr("download", $(options.code).val().replace(/^\d*/, "").replace(/00(\d{3})/g,"$1")+"pl.jpg");
			pl_a.append(pl_img);
			var pl_div = div.clone();
			pl_div.append(pl_a);
			$(options.container).append(pl_div);

			var load_img = function(num) {

				num = num || 1;

				var pic_img = img.clone();
				pic_img.attr("src", pic_url.replace(/%s/g, $(options.code).val()).replace(/%d/, num));
				pic_img.load(function() {
					if (this.width > 200 && this.height > 200) {
						var pic_a = a.clone();
						pic_a.attr("href", this.src);
						pic_a.attr("download", $(options.code).val().replace(/^\d*/, "").replace(/00(\d{3})/g,"$1")+(num>=10?"-":"-0")+num+".jpg");
						pic_a.append(pic_img);
						var pic_div = div.clone();
						pic_div.append(pic_a);
						$(options.container).append(pic_div);
						load_img(num+1);
					}
				});
			};
			load_img();
		});
		
		return this;
	};

}(jQuery));
