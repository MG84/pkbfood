Meteor.users.allow({
	update: function(userId, user) {
		return sameUser(userId, user);
	},
	remove: function(userId, user) {
		return sameUser(userId, user);
	}
});

