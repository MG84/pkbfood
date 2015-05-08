Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return Meteor.subscribe('deals');
	}
});

Router.map(function() {
	this.route('dealsList', {path: '/'});
});

Router.onBeforeAction('loading');