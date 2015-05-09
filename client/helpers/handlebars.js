Template.registerHelper('pluralize', function(n, thing) {
	// basic pluralizer
	if (n === 1) {
		return '1' + thing;
	} else {
		return n + ' ' + thing + 's';
	}
});

Template.registerHelper('breaklines', function(text) {
	text = text.replace(/(\r\n|\n|\r)/gm, '<br />');
	return new Handlebars.SafeString(text);
});