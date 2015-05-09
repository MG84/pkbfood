Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return [Meteor.subscribe('notifications')];
	}
});

DealsListController = RouteController.extend({
	template: 'dealsList',
	increment: 5,
	dealsLimit: function() {
		return parseInt(this.params.dealsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.dealsLimit()};
	},
	subscriptions: function() {
    	this.dealsSub = Meteor.subscribe('deals', this.findOptions());
  	},
	// waitOn: function() {
	// 	return Meteor.subscribe('deals', this.findOptions());
	// },
	deals: function() {
		return Deals.find({}, this.findOptions());	
	},
	data: function() {
		var self = this;
		return {
			deals: self.deals(),
			ready: self.dealsSub.ready,
			nextPath: function() {
				if(self.deals().count() === self.dealsLimit())
					return self.nextPath();
			}
		};
		// var hasMore = this.deals().count() === this.limit();
		// return {
		// 	deals: this.deals(),
		// 	nextPath: hasMore ? this.nextPath() : null
		// };
	}
});

NewDealsListController = DealsListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newDeals.path({
			dealsLimit: this.dealsLimit() + this.increment
		})
	}
});

BestDealsListController = DealsListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestDeals.path({
			dealsLimit: this.dealsLimit() + this.increment
		})
	}
});

Router.map(function() {

	this.route('home', {
		path: '/',
		template: 'carousel'
	});

	this.route('newDeals', {
		path:'/new/:dealsLimit?',
		controller: NewDealsListController
	});

	this.route('bestDeals', {
		path: '/best/:dealsLimit?',
		controller: BestDealsListController
	});

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
		path: '/submit'
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