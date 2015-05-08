Deals = new Meteor.Collection('deals');

Deals.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Deals.deny({
	update: function(userId, deal, fieldNames) {
		// may only edit the following two fields:
		return (_.without(fieldNames, 'url', 'title').length > 0)
	}
})

Meteor.methods({
	post: function(dealAttributes) {
		var user = Meteor.user(), 
			dealWithSameLink = Deals.findOne({url: dealAttributes.url});

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, 'You need to login to post new deals');

		// ensure the deal has a title
		if (!dealAttributes.title)
			throw new Meteor.Error(422, 'Please fill in a title for this deal');

		// check that there are no previous deals with the same link
		if (dealAttributes.url && dealWithSameLink) {
			throw new Meteor.Error(302,
				'This link has already been posted',
				dealWithSameLink._id);
		}

		// pick out the whitelisted keys
		var deal = _.extend(_.pick(dealAttributes, 'url', 'title', 'message'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		var dealId = Deals.insert(deal);

		return dealId;
	}
});