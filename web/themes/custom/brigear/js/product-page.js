jQuery(document).ready(function() {
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
});