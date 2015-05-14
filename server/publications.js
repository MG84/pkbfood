Meteor.publish('deals', function(options){
	return Deals.find({}, options);
});

Meteor.publish('singleDeal', function(id) {
	return id && Deals.find(id);
});

Meteor.publish('requests', function(options){
	return Requests.find({}, options);
});

Meteor.publish('singleRequest', function(id){
	return Requests.find(id);
});

Meteor.publish('comments', function(objId){
	return Comments.find({objId: objId});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
});

Meteor.publish("user", function(id) {
	debugger;
	return id && Meteor.users.find({_id: id});
});

Meteor.publish("users", function(options) {
	debugger;
	return Meteor.users.find({}, options);
});