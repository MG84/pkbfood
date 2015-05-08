Meteor.publish('deals', function(){
	return Deals.find();
});

Meteor.publish('comments', function(){
	return Comments.find({dealId: dealId});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
})