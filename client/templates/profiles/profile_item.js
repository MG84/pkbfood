Template.profileItem.helpers({
	upvotedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.upvoters, userId)) {
			return 'btn-primary upvotable';
		} else {
			return 'disabled';
		}
	}
});

Template.profileItem.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});