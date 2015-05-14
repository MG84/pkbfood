DealsListController = GenericListController.extend({
	name: 'deals',
	template: 'dealsList',
	object: Deals,

});

NewDealsListController = DealsListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newDeals.path({
			dealsLimit: this.objectsLimit() + this.increment
		})
	}
});

BestDealsListController = DealsListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestDeals.path({
			dealsLimit: this.objectsLimit() + this.increment
		})
	}
});