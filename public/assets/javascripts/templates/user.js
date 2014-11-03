(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['user'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "<div class=\"user\">\n	<span>"
    + escapeExpression(((helpers['define-symbol'] || (depth0 && depth0['define-symbol']) || helperMissing).call(depth0, (depth0 != null ? depth0.symbol : depth0), {"name":"define-symbol","hash":{},"data":data})))
    + "</span>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\n</div>";
},"useData":true});
})();