RequestsListController = GenericListController.extend({
	name: 'requests',
	template: 'requestsList',
	object: Requests,

});

NewRequestsListController = RequestsListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Routed.routes.newRequests.path({
			requestsLimit: this.objectsLimit() + this.increment
		});
	}
});

BestRequestsListController = RequestsListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestRequests.path({
			requestsLimit: this.objectsLimit() + this.increment
		});
	}
});
