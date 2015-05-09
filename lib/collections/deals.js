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
		// may only edit the following two fields:
		return (_.without(fieldNames, 'url', 'title').length > 0)
	}
})

Deals.deny({
	update: function(userId, deal, fieldNames, modifier) {
		var errors = validateDeal(modifier.$set);
		return errors.title || errors.url;
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
			url: String
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

		// // ensure the user is logged in
		// if (!user)
		// 	throw new Meteor.Error(401, 'You need to login to post new deals');

		// // ensure the deal has a title
		// if (!dealAttributes.title)
		// 	throw new Meteor.Error(422, 'Please fill in a title for this deal');

		// // check that there are no previous deals with the same link
		// if (dealAttributes.url && dealWithSameLink) {
		// 	throw new Meteor.Error(302,
		// 		'This link has already been posted',
		// 		dealWithSameLink._id);
		// }

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