Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return [Meteor.subscribe('notifications')];
	}
});


Router.map(function() {

	this.route('home', {path: '/', template: 'carousel'});

	this.route('aboutUs', {path: '/about', template: 'about'});
	
	// Users
	this.route('profilesList', { path: '/profiles', controller: 'ProfileController'});
});

var requireLogin = function(pause) {
	if (! Meteor.user()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
};


Router.onBeforeAction(requireLogin, {only: 'dealSubmit'});
Router.onBeforeAction(requireLogin, {only: 'requestSubmit'});
// Router.onBeforeAction(function() { clearErrors() });