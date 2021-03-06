Template.requestFull.helpers({
	ownRequest: function() {
		return this.userId == Meteor.userId();
	},
	upvotedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.upvoters, userId)) {
			return 'btn-primary upvotable';
		} else {
			return 'disabled';
		}
	}
});

Template.requestItem.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});