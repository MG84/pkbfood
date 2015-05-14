Router.map(function() {
	// REQUESTS
	this.route('newRequests', {path: '/newRequests/:requestsLimit?',
		controller: 'NewRequestsListController'
	});

	this.route('bestRequests', {path: '/bestRequests/:requestsLimit?',
		controller: 'BestRequestsListController'
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