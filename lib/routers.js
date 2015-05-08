Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return [Meteor.subscribe('notifications')];
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
		waitOn: function() {
			var dealLimit = parseInt(this.params.dealsLimit) || 5;
			return Meteor.subscribe('deals', {
				sort: {submitted: -1},
				limit: dealLimit
			});
		},
		data: function() {
			var limit = parseInt(this.params.dealsLimit) || 5;
			return {
				deal: Deals.find({}, {sort:{submitted: -1}, limit: limit})
			};
		}
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