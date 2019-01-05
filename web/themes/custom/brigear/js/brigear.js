// Setup utils
String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};
jQuery.fn.attrStartsWith = function(p) {
  var pCamel = p.replace(/-([a-z])/ig, function(m,$1) { return $1.toUpperCase(); });
  return this.filter(function(i, el){
    return Object.keys(el.dataset).some(function(v){
      return v.indexOf(pCamel) > -1;
    });
  });
};

// Setup Youtube iframe
function onYouTubeIframeAPIReady() {
    // Query all youtube video elements
    videos = jQuery('.youtube-video');
    for (var i = 0, l = videos.length; i < l; i++) {
        var video = videos[i];
        // Get source value
        var src = video.attributes['src'].value;
        if(!src || src === null) continue;

        // Check src is from Youtube
        var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
        if (!isYoutube) continue;

        // Parse video id
        var videoId = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
        videoId = (videoId.length > 1) ? videoId.splice(1) : videoId;
        videoId = videoId.toString();

        // Set up player
        var player = new YT.Player(video.id, {
            videoId : videoId,
            playerVars: {
                'origin': location.origin,
                'autoplay': 1,
                'showinfo': 0,
                'frameborder': 0,
                'controls': 0,
                'fs': 0,
                'loop': 1,
                'autohide': 1
            },
            events : {
                'onReady' : function(event) {
                    event.target.playVideo();
                    event.target.mute();
                },
                'onStateChange': function(event) {
                    if(event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
                        event.target.playVideo();
                        event.target.mute();
                    }
                }
            }
        });
    }
}

jQuery(document).ready(function() {
    var data = jQuery('#brigear-data');
    if(data.length === 0) return;

    if(data.attr('data-page') === 'commerce-product--full') {
        // Get product attributes
        var productAttrs = new Set();
        var productAttrDivs = jQuery('#brigear-data > #brigear-product-attributes').children('div');
        for(var div of productAttrDivs) {
            productAttrs.add(jQuery(div).attr('data-product-attribute'));
        }

        // Get product variations
        var productVariations = {};
        var productVariationDivs = jQuery('#brigear-data > #brigear-product-variations').children('div');
        for(var div of productVariationDivs) {
            var d = jQuery(div);
            var variation = { id: d.attr('data-variation') };
            for(var attr of productAttrs) {
                variation[attr] = d.attr('data-product-attribute-{0}'.format(attr));
            }
            productVariations[d.attr('data-variation')] = variation;
        }

        // Listen to attribute change
        for (var attr of productAttrs) {
            jQuery('input[name="product-attribute-{0}"], select[name="product-attribute-{1}"]'
                .format(attr, attr)).change(function() {
                var changedAttr = jQuery(this).attr('name').substr(18);
                var changedValue = jQuery(this).val();

                // Get all available variation fit with newly changed attribute
                var availableVariations = {};
                for(var variationId in productVariations) {
                    if(productVariations[variationId][changedAttr] == changedValue) {
                        availableVariations[variationId] = productVariations[variationId];
                    }
                }

                // Update other inputs
                for(var otherAttr of productAttrs) {
                    if(otherAttr === changedAttr) continue;

                    // Disable all values
                    jQuery('input[name="product-attribute-{0}"], select[name="product-attribute-{1}"] > option'
                        .format(otherAttr, otherAttr))
                        .attr('disabled', true);

                    // Enable available values
                    for(var variationId in availableVariations) {
                        jQuery('input[name="product-attribute-{0}"][value="{1}"], select[name="product-attribute-{2}"] > option[value="{3}"]'
                            .format(otherAttr, availableVariations[variationId][otherAttr],
                                otherAttr, availableVariations[variationId][otherAttr]))
                            .attr('disabled', false);
                    }
                }

                // Update selected variation
                var selectedVariationSelector = '#brigear-data > #brigear-product-variations > div';
                for(var checkAttr of productAttrs) {
                    var checkValue = jQuery('input[name="product-attribute-{0}"]:checked, select[name="product-attribute-{1}"]'
                                        .format(checkAttr, checkAttr)).val();
                    selectedVariationSelector += '[data-product-attribute-{0}="{1}"]'.format(checkAttr, checkValue);
                }
                var selectedVariationId = jQuery(selectedVariationSelector).attr('data-variation');
                jQuery('.product-variation[data-variation!="{0}"]'.format(selectedVariationId)).hide();
                jQuery('.product-variation[data-variation="{0}"]'.format(selectedVariationId)).show();
            })
        }

        // Initial select
        var selectedProductVariationDiv = jQuery('#brigear-data > #brigear-selected-variation');
        var selectedProductVariation = productVariations[selectedProductVariationDiv.attr('data-variation')];
        for(var attr of productAttrs) {
            jQuery('input[name="product-attribute-{0}"][value="{1}"]'
                .format(attr, selectedProductVariation[attr]))
                .attr('checked', true);
            jQuery('select[name="product-attribute-{0}"]'
                .format(attr))
                .val(selectedProductVariation[attr]);
        }
        jQuery('input[name*="product-attribute"], select[name*="product-attribute"]'
            .format(attr, attr)).first().change();

        // Alter some fields
        jQuery('.product-full-page .full-description img').addClass('img-fluid');
        jQuery('.product-full-page .full-description p').addClass('px-lg-5');
        jQuery('.product-full-page .full-description p:has(> img)').removeClass('px-lg-5');
    }
});