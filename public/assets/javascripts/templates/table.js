(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['table'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "	<button type=\"button\" class=\"item\" data-position=\""
    + escapeExpression(lambda((this.data(data, 1) && this.data(data, 1).index), depth0))
    + ","
    + escapeExpression(lambda((data && data.index), depth0))
    + "\">"
    + escapeExpression(((helpers['define-symbol'] || (depth0 && depth0['define-symbol']) || helperMissing).call(depth0, depth0, {"name":"define-symbol","hash":{},"data":data})))
    + "</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});
})();