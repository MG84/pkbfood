//Router for Profiles
Router.map(function() {
	this.route('newProfiles', {path: '/newProfiles/:profilesLimit?',
		controller: 'NewProfilesListController'
	});

	this.route('bestProfiles', {path: '/bestProfiles/:profilesLimit?',
		controller: 'NewProfilesListController'
	});

	this.route('profilePage', {path: 'profiles/:id',
		waitOn: function() {
			return [Meteor.subscribe('userData', this.params._id),
				Meteor.subscribe('comments', this.params._id)]
		},
		data: function() {
			return Meteor.users.findOne(this.params._id);}
	});

	this.route('profileEdit', {path: '/profiles/:_id/edit',
		waitOn: function() {
			return Meteor.subscribe('userData', this.params._id);
		},
		data: function() {
			return Meteor.users.findOne(this.params._id);
		}
	});
});