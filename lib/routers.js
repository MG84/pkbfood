Router.configure({
	layoutTemplate: 'layout',
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
	deals: function() {
		return Deals.find({}, this.findOptions());	
	},
	data: function() {
		var hasMore = this.deals().count() === this.limit();
		var nextPath = this.route.path({dealsLimit: this.limit() + this.increment});

		return {
			deals: this.deals(),
			nextPath: hasMore ? nextPath : null
		};
	}
});

Router.map(function() {

	this.route('dealPage', {
		path: 'deals/:_id',
		waitOn: function() {
			return [
				Meteor.subscribe('singleDeal', this.params._id),
				Meteor.subscribe('comments', this.params._id)
			]
		},
		data: function() {
			return Deals.findOne(this.params._id);
		}
	});

	this.route('dealEdit', {
		path: '/deals/:_id/edit',
		waitOn: function() {
			return Meteor.subscribe('singleDeal', this.params._id);
		},
		data: function() {
			return Deals.findOne(this.params._id);
		}
	});

	this.route('dealSubmit', {
		path: '/submit',
		disableProgress: true
	});

	this.route('dealsList', {
		path: '/:dealsLimit?',
		controller: DealsListController
	});
});

var requireLogin = function(pause) {
	if (! Meteor.user()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
};


Router.onBeforeAction(requireLogin, {only: 'dealSubmit'});
// Router.onBeforeAction(function() { clearErrors() });