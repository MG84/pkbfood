Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return Meteor.subscribe('deals');
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
});

Router.onBeforeAction('loading');