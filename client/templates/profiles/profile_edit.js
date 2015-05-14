Template.profileEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentProfileId = this._id;

		var profileProperties = {
			username: $(e.target).find('[name=username]').val(),
			name: $(e.target).find('[name=name]').val(),

		}
		Meteor.users.update(currentProfileId, {$set: profileProperties}, function(error) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('profilePage', {_id: currentProfileId});
			}
		});
	}
});