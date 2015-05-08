if (Deals.find().count() === 0) {
	Deals.insert({
		title: 'Spaghetti al nero di seppia',
		author: 'Felicia Sangermano',
		url: 'http://potkettleblack.it/spaghetti-al-nero-di-seppia/'
	});

	Deals.insert({
		title: 'Red velvet cake',
		author: 'Felicia Sangermano',
		url: 'http://potkettleblack.it/red-velvet-cake/'
	});

	Deals.insert({
		title: 'Crepes ripiene con carciofi al curry',
		author: 'Felicia Sangermano',
		url: 'http://potkettleblack.it/crepes-carciofi-curry/'
	});
}