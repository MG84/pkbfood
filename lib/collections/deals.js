Deals = new Meteor.Collection('deals');

Deals.allow({
	insert: function(userId, doc) {
		//only allow posting if you are logged in
		return !! userId;
	}
});