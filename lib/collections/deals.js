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
		return (_.without(fieldNames, 'url', 'title', 'message').length > 0)
	}
})

Deals.deny({
	update: function(userId, deal, fieldNames, modifier) {
		var errors = validateDeal(modifier.$set);
		return errors.title || errors.url || errors.message;
	}
});

validateDeal = function(deal) {
	var errors = {};

	if (!deal.title)
		errors.title = "Please fill in a title";
	if (!deal.url)
		errors.url = "Please fill in a URL";

	return errors;
};

Meteor.methods({
	dealInsert: function(dealAttributes) {
		check(this.userId, String);
		check(dealAttributes, {
			title: String,
			url: String,
			message: String
		});
		var errors = validateDeal(dealAttributes);
		if (errors.title || errors.url)
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
		
		var dealWithSameLink = Deals.findOne({url: dealAttributes.url});
		if (dealWithSameLink) {
			return {
				dealExists: true,
				_id: dealWithSameLink._id 
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
			throw new Meteor.Error('invalid', "You weren't able to upvote that deal");

	}
});