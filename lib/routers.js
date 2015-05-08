Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return [Meteor.subscribe('deals'), Meteor.subscribe('comments')];
	}
});

Router.map(function() {
	this.route('dealsList', {path: '/'});

	this.route('dealPage', {
		path: 'deals/:_id',
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