Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return [Meteor.subscribe('notifications')];
	}
});

RequestsListController = RouteController.extend({
	template: 'requestsList',
	increment: 5,
	requestsLimit: function() {
		return parseInt(this.params.requestsLimit) || this.increment;		
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.requestsLimit()};
	},

	subscriptions: function() {
		this.requestsSub = Meteor.subscribe('requests', this.findOptions());
	},

	requests: function() {
		return Requests.find({}, this.findOptions());
	},
	data: function() {
		var self = this;
		return {
			requests: self.requests(),
			ready: self.requestsSub.ready,
			nextPath: function() {
				if(self.requests().count() === self.requestsLimit())
					return self.nextPath
			}
		};
	}
});

NewRequestsListController = RequestsListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Routed.routes.newRequests.path({
			requestsLimit: this.requestsLimit() + this.increment
		});
	}
});

BestRequestsListController = RequestsListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestRequests.path({
			requestsLimit: this.requestsLimit() + this.increment
		});
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

	this.route('home', {path: '/',
		template: 'carousel'
	});

	this.route('aboutUs', {path: '/about',
		template: 'about'
	});

	// DEALS
	this.route('newDeals', {path:'/new/:dealsLimit?',
		controller: NewDealsListController
	});

	this.route('bestDeals', {path: '/best/:dealsLimit?',
		controller: BestDealsListController
	});

	this.route('dealPage', {path: 'deals/:_id',
		waitOn: function() {
			return [Meteor.subscribe('singleDeal', this.params._id),
				Meteor.subscribe('comments', this.params._id)]
		},
		data: function() {return Deals.findOne(this.params._id);}
	});

	this.route('dealEdit', {path: '/deals/:_id/edit',
		waitOn: function() {
			return Meteor.subscribe('singleDeal', this.params._id);
		},
		data: function() {
			return Deals.findOne(this.params._id);
		}
	});
	
	this.route('dealSubmit', {path: '/submit'});

	// REQUESTS
	this.route('newRequests', {path: '/newRequests/:requestsLimit?',
		controller: NewRequestsListController
	});

	this.route('bestRequests', {path: '/bestRequests/:requestsLimit?',
		controller: BestRequestsListController
	});

	this.route('requestPage', {path:'requests/:_id',
		waitOn: function() {
			return [Meteor.subscribe('singleRequest', this.params._id),
				Meteor.subscribe('comments', this.params._id)]
		},
		data: function() {return Requests.findOne(this.params._id);}
	});

	this.route('requestEdit', {path: '/requets/:_id/edit', 
		waitOn: function() {
			return Meteor.subscribe('singleRequest', this.params._id);
		},
		data: function() {
			return Requests.findOne(this.params._id);
		}
	});

	this.route('requestSubmit', {path: '/requestSubmit'});

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