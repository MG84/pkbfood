//Router for Deals
Router.map(function() {
	this.route('newDeals', {path:'/newDeals/:dealsLimit?',
		controller: 'NewDealsListController'
	});

	this.route('bestDeals', {path: '/bestDeals/:dealsLimit?',
		controller: 'BestDealsListController'
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
});