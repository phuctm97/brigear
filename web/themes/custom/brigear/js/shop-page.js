jQuery(document).ready(function() {
	jQuery('.product-item-col').each(function() {
		// Get product id
		var productId = jQuery(this).find('#brigear-data').attr('data-product');

        // Get product variations
	    var productVariations = {};
	    var productVariationDivs = jQuery(this).find('#brigear-data > #brigear-product-variations > div');
	    for(var div of productVariationDivs) {
	        var d = jQuery(div);
	        var variation = { id: d.attr('data-variation') };
	        for(var attr of div.attributes) {
	        	if(attr.name.startsWith('data-product-attribute')){
		            variation[attr.name.substr(23)] = attr.value;
	        	}
	        }
	        productVariations[variation.attribute_color] = variation;
	    }

    	// Listen to attribute change
    	var img = jQuery(this).find('img');
    	jQuery(this).find('input[name="color-{0}"][type="radio"]'.format(productId))
    	  .change(function() {
    		var selectedColor = jQuery(this).val();
    		img.attr('src', productVariations[selectedColor]['main-image']);
    	});

    	// Initial select
    	jQuery(this).find('input[name="color-{0}"][type="radio"]'.format(productId))
    		.first().attr('checked', true);
    	jQuery(this).find('input[name="color-{0}"][type="radio"]:checked'.format(productId))
    		.first().change();
	});
});