Requests = new Mongo.Collection('requests');

Requests.allow({
	update: function(userId, request) {
		return ownsDocument(userId, request);
	},
	remove: function(userId, request) {
		return ownsDocument(userId, request);
	},
});

Requests.deny({
	update: function(userId, request, fieldNames) {
		return (_.without(fieldNames,
			'title',
			'message',
			'city',
			'people',
			'image'
			).length > 0)
	}
});

Requests.deny({
	update: function(userId, request, fieldNames, modifier) {
		var errors = validateRequest(modifier.$set);
		return errors.title
		|| errors.message
		|| errors.city
		|| errors.people;
	}
});

validateRequest = function(request) {
	var errors = {};

	if (!request.title)	
		errors.title = "Please fill in a title";

	if (!request.message)
		errors.message = "Please fill in a Description";

	if (!request.city)
		errors.city = "Please fill in a City";

	if (!request.people)
		errors.people = "Please fill in a number of People";

	return errors;
};

Meteor.methods({
	requestInsert: function(requestAttributes) {
		check(this.userId, String);
		debugger;
		check(requestAttributes, {
			title: String,
			message: String, 
			city: String,
			people: String,
		});

		var errors = validateRequest(requestAttributes);
		if (errors.title)
			throw new Meteor.Error('invalid-post', "You must set all the fields");

		var requestWithSameTitle = Requests.findOne({title: requestAttributes.title, author: this.userId});
		if (requestWithSameTitle) {
			return {
				requestExists: true,
				_id: requestWithSameTitle._id
			}
		}

		var user = Meteor.user();

		var request = _.extend(requestAttributes, {
			userId: user._id,
			author: user.userame,
			submitted: new Date().getTime(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});

		var requestId = Requests.insert(request);

		return {_id: requestId};
	},

	// upvote: function(requestId) {
	// 	check(this.userId, String);
	// 	check(requestId, String);
	// 	var affected = Requests.update({
	// 		_id: requestId,
	// 		upvoters: {$ne: this.userId}
	// 	}, {
	// 		$addToSet: {upvoters: this.userId},
	// 		$inc: {votes: 1}
	// 	});

	// 	if (!affected)
	// 		throw new Meteor.Error('invalid', "You weren't able to upvote that request");
	// }
});