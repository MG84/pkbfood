// Notifications & Notification helpers

Template.notifications.helpers({
	notifications: function() {
		return Notifications.find({userId: Meteor.userId(), read: false});
	},
	notificationCount: function(){
		return Notifications.find({userId: Meteor.userId(), read: false}).count();
	}
});

Template.notification.helpers({
	notificationDealPath: function() {
		return Router.routes.dealPage.path({_id: this.dealId});
	}
});

Template.notification.events({
	'click a': function() {
		Notifications.update(this._id, {$set: {read:true}});
	}
});