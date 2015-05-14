// Extend this Generic List Controller by 
// setting name, template and object

GenericListController = RouteController.extend({
	//
	// name: '',
	// template: '',
	increment: 5,
	
	objectsLimit: function() {
		return parseInt(this.params.objectsLimit) || this.increment;
	},
	
	findOptions: function() {
		return {sort: this.sort, limit: this.objectsLimit()};
	},

	subscriptions: function() {
		this.objectsSub = Meteor.subscribe(this.name, this.findOptions());
	},
	
	objects: function() {
		return this.object.find({}, this.findOptions());
	},
	
	data: function() {
		var self = this;
		return {
			objects: self.objects(),
			ready: self.objectsSub.ready,
			nextPath: function() {
				if(self.objects().count() === self.objectsLimit())
					return self.nextPath
			}
		};
	}
});