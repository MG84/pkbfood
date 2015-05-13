// Fixture data
if (Deals.find().count() === 0) {
	var now = new Date().getTime();

	// Create two users
	// Alice
	var aliceId = Meteor.users.insert({
		profile: { name: 'Alice' }
	});
	var alice = Meteor.users.findOne(aliceId);
	
	// Bob
	var bobId = Meteor.users.insert({
		profile: {name: 'Bob'}
	});
	var bob = Meteor.users.findOne(bobId);

	// Mario
	var marioId = Meteor.users.insert({
		profile: {name: 'Mario'}
	});
	var mario = Meteor.users.findOne(marioId);

	// Luigi
	var luigiId = Meteor.users.insert({
		profile: {name: 'Luigi'}
	});
	var luigi = Meteor.users.findOne(luigiId);

	// Andrea
	var andreaId = Meteor.users.insert({
		profile: {name: 'Andrea'}
	});
	var andrea = Meteor.users.findOne(andreaId);


	// Create few Deals one with comments
	var spaghettiId = Deals.insert({
		title: "Spaghetti al nero di seppia",
		userId: alice._id,
		author: alice.profile.name,
		submitted: now - 7 *3600 * 1000,
		commentsCount: 2,
		upvoters: [], 
		votes: 0,
		people: 2,
		price: 12,
		city: 'Napoli',
		message: 'http://potkettleblack.it/spaghetti-al-nero-di-seppia/'
	});

	Comments.insert({
		objId: spaghettiId,
		userId: bob._id,
		author: bob.profile.name,
		submitted: now - 5 * 3600 * 1000,
		body: "Brava Alice, ottima ricetta! Mi piacerebbe proprio provarli, sei libera la prossima settimana?"
	});

	Comments.insert({
		objId: spaghettiId,
		userId: alice._id,
		author: alice.profile.name,
		submitted: now - 3 * 3600 * 1000,
		body: 'Grazie Tom! Va bene per la prossima settimana. A presto!'
	})

	Deals.insert({
		title: 'Red velvet cake',
		userId: bob._id,
		author: bob.profile.name,
		submitted: now - 10 * 3600 * 1000,
		commentsCount: 0,
		upvoters: [],
		votes: 0,
		price: 5,
		people: 1,
		city: 'Roma',
		message: 'http://potkettleblack.it/red-velvet-cake/'
	});

	Deals.insert({
		title: 'Crepes ripiene con carciofi al curry',
		userId: alice._id,
		author: alice.profile.name,
		submitted: now - 10 * 3600 * 1000,
		commentsCount: 0,
		upvoters: [],
		votes: 0,
		message: 'http://potkettleblack.it/crepes-carciofi-curry/',
		price: 15,
		people: 2,
		city: 'Milano'
	});

	var cenaRomanticaPerDue = Requests.insert({
		title: "Cena romantica per due",
		userId: mario._id,
		author: mario.profile.name,
		submitted: now - 7 *3600 * 1000,
		commentsCount: 2,
		upvoters: [],
		votes: 0,
		people: 2,
		city: 'Roma',
		message: 'Devo organizzare una cena romantica per me e la mia ragazza, vorrei un menù di mare composto da antipasto, primo, secondo e dolce comprensivo di bevande. Quanto mi costa?'
	});

	Comments.insert({
		objId: cenaRomanticaPerDue,
		userId: bob._id,
		author: bob.profile.name,
		submitted: now - 5 * 3600 * 1000,
		body: "Ciao Mario! Ti propongo un menù formato da un antipasto di gamberetti in salsa rosa e spumante, come primo suggerisco uno spaghetto alle vongole accompagnato da un buon vino bianco, mentre per secondo orata al forno. Come dessert sorbetto al limone. Il prezzo per due persone è di 50 euro. Che ne dici?"
	});

	Comments.insert({
		objId: cenaRomanticaPerDue,
		userId: alice._id,
		author: alice.profile.name,
		submitted: now - 3 * 3600 * 1000,
		body: "Caro Mario! Questa settimana ho degli ottimi gamberoni e delle cozze veraci splendide. Ti proporrei quindi come antipasto un'insalata di mare accompagnate da un prosecco. Come primo impepata di cozze e un ottimo vino bianco del trentino. Mentre per secondo gamberoni alla griglia accompagnati da asparagi al forno. Per concludere cheesecake con panna. Il prezzo per il mio menù è di 60 euro. A presto e fammi sapere!"
	})

	Requests.insert({
		title: 'Buffet di lavoro',
		userId: luigi._id,
		author: luigi.profile.name,
		submitted: now - 10 * 3600 * 1000,
		upvoters: [],
		votes: 0,
		commentsCount: 0,
		people: 20,
		city: 'Milano',
		message: "Devo organizzare un buffet di lavoro per celebrare la chiusura di un contratto molto importante. Ci saranno 20 persone, l'ambiente è professionale ed ho bisogno di un team che si occupi di un aperitivo, stuzzichini vari, dolci e bevande vino e champagne. Cosa mi proponete?"
	});

	Requests.insert({
		title: 'Prima comunione di mio figlio',
		userId: andrea._id,
		author: andrea.profile.name,
		submitted: now - 10 * 3600 * 1000,
		commentsCount: 0,
		upvoters: [],
		votes: 0,
		people: 50,
		city: 'Napoli',
		message: 'Ciao a tutti! Devo organizzare una festa per celebrare la prima comunione di mio figlio. Ci saranno almeno 20 ragazzini impazziti, e 30 adulti. Festeggiamo a Capo di Monte, ho bisogno di qualcuno che si occupi del buffet e delle bevande (naturalmente non alcoliche), Fatemi sapere.'
	});

	//Create few Requests one with comments

	// for (var i = 0; i < 10; i++) {
	// 	Deals.insert({
	// 		title: 'Test Chef Deal #' + i,
	// 		author: (i%2==0) ? alice.profile.name : bob.profile.name,
	// 		userId: (i%2==0) ? alice._id : bob._id,
	// 		url: 'http://wwww.potkettleblack.it',
	// 		submitted: now - i * 3600 * 1000,
	// 		commentsCount: 0, 
	// 		upvoters: [],
	// 		votes: 0
	// 	});
	// }
}