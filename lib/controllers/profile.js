ProfilesListController = GenericListController.extend({
	name: 'profile',
	template: 'profilesList',
	object: Meteor.users,
});

NewProfilesListController = ProfilesListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newProfiles.path({
			profilesLimit: this.objectsLimit() + this.increment
		})
	}
});

BestProfilesListController = ProfilesListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newProfiles.path({
			profilesLimit: this.objectsLimit() + this.increment
		})
	}
});