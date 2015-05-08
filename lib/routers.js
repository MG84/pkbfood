Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return [Meteor.subscribe('notifications')];
	}
});

DealsListController = RouteController.extend({
	template: 'dealsList',
	increment: 5,
	limit: function() {
		return parseInt(this.params.dealsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {submitted: -1}, limit: this.limit()};
	},
	waitOn: function() {
		return Meteor.subscribe('deals', this.findOptions());
	},
	data: function() {
		return {deals: Deals.find({}, this.findOptions())};
	}
});

Router.map(function() {

	this.route('dealPage', {
		path: 'deals/:_id',
		waitOn: function() {
			return Meteor.subscribe('comments', this.params._id);
		},
		data: function() {
			return Deals.findOne(this.params._id);
		}
	});

	this.route('dealEdit', {
		path: '/deals/:_id/edit',
		data: function() {
			return Deals.findOne(this.params._id);
		}
	});

	this.route('dealSubmit', {
		path: '/submit'
	});

	this.route('dealsList', {
		path: '/:dealsLimit?',
		controller: DealsListController
	});
});

var requireLogin = function(pause) {
	if (! Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate);

		this.render('accessDenied');
		pause();
	}
};


Router.onBeforeAction(requireLogin, {only: 'dealSubmit'});
// Router.onBeforeAction(function() { clearErrors() });