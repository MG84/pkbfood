Deals = new Mongo.Collection('deals');

Deals.allow({
	update: function(userId, deal) { 
		return ownsDocument(userId, deal); 
	},
	remove: function(userId, deal) { 
		return ownsDocument(userId, deal); 
	},
});

Deals.deny({
	update: function(userId, deal, fieldNames) {
		// may only edit the following fields:
		return (_.without(fieldNames, 
			// 'url',
			'title',
			'message', 
			'city', 
			'people', 
			'price').length > 0)
	}
});

Deals.deny({
	update: function(userId, deal, fieldNames, modifier) {
		var errors = validateDeal(modifier.$set);
		return errors.title 
		|| errors.message 
		|| errors.city 
		|| errors.people
		|| errors.price;
	}
});

validateDeal = function(deal) {
	var errors = {};

	if (!deal.title)
		errors.title = "Please fill in a title";
	// if (!deal.url)
	// 	errors.url = "Please fill in a URL";
	
	if (!deal.message)
		errors.message = "Please fill in a Description";
	
	if (!deal.city)
		errors.city = "Please fill in a City";
	
	if (!deal.people)
		errors.people = "Please fill in a number of People";

	if (!deal.price)
		errors.price = "Please fill in a price";

	return errors;
};

Meteor.methods({
	dealInsert: function(dealAttributes) {
		check(this.userId, String);
		check(dealAttributes, {
			title: String,
			// url: String,
			message: String,
			city: String,
			people: String,
			price: String
		});

		var errors = validateDeal(dealAttributes);
		if (errors.title)
			throw new Meteor.Error('invalid-post', "You must set all the fields");
		
		var dealWithSameTitle = Deals.findOne({title: dealAttributes.title, author: this.userId});
		if (dealWithSameTitle) {
			return {
				dealExists: true,
				_id: dealWithSameTitle._id 
			}
		}

		var user = Meteor.user();

		var deal = _.extend(dealAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});

		var dealId = Deals.insert(deal);

		return {_id: dealId};
	},

	upvote: function(dealId) {
		check(this.userId, String);
		check(dealId, String);
		var affected = Deals.update({
			_id: dealId,
			upvoters: {$ne: this.userId}
		}, {
			$addToSet: {upvoters: this.userId},
			$inc: {votes: 1}
		});
		
		if (!affected)
			throw new Meteor.Error('invalid', "You weren't able to upvote");

	}
});