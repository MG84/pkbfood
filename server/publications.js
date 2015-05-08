Meteor.publish('deals', function(options){
	return Deals.find({}, options);
});

Meteor.publish('comments', function(dealId){
	return Comments.find({dealId: dealId});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
})