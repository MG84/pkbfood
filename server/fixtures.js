// Fixture data
if (Deals.find().count() === 0) {
	var now = new Date().getTime();

	// create two users
	var aliceId = Meteor.users.insert({
		profile: { name: 'Alice' }
	});
	var alice = Meteor.users.findOne(aliceId);

	var bobId = Meteor.users.insert({
		profile: {name: 'Bob'}
	});
	var bob = Meteor.users.findOne(bobId);

	// create few deals one with comments

	var spaghettiId = Deals.insert({
		title: "Spaghetti al nero di seppia",
		userId: alice._id,
		author: alice.profile.name,
		url: 'http://potkettleblack.it/spaghetti-al-nero-di-seppia/',
		submitted: now - 7 *3600 * 1000,
		commentsCount: 2,
		upvoters: [], 
		votes: 0
	});

	Comments.insert({
		dealId: spaghettiId,
		userId: bob._id,
		author: bob.profile.name,
		submitted: now - 5 * 3600 * 1000,
		body: "Brava Alice, ottima ricetta! Mi piacerebbe proprio provarli, sei libera la prossima settimana?"
	});

	Comments.insert({
		dealId: spaghettiId,
		userId: alice._id,
		author: alice.profile.name,
		submitted: now - 3 * 3600 * 1000,
		body: 'Grazie Tom! Va bene per la prossima settimana. A presto!'
	})

	Deals.insert({
		title: 'Red velvet cake',
		userId: bob._id,
		author: bob.profile.name,
		url: 'http://potkettleblack.it/red-velvet-cake/',
		submitted: now - 10 * 3600 * 1000,
		commentsCount: 0,
		upvoters: [],
		votes: 0
	});

	Deals.insert({
		title: 'Crepes ripiene con carciofi al curry',
		userId: alice._id,
		author: alice.profile.name,
		url: 'http://potkettleblack.it/crepes-carciofi-curry/',
		submitted: now - 10 * 3600 * 1000,
		commentsCount: 0,
		upvoters: [],
		votes: 0
	});

	for (var i = 0; i < 10; i++) {
		Deals.insert({
			title: 'Test Chef Deal #' + i,
			author: (i%2==0) ? alice.profile.name : bob.profile.name,
			userId: (i%2==0) ? alice._id : bob._id,
			url: 'http://wwww.potkettleblack.it',
			submitted: now - i * 3600 * 1000,
			commentsCount: 0, 
			upvoters: [],
			votes: 0
		});
	}
}