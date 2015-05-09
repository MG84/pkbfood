// Local (client-only) collection
Errors = new Mongo.Collection(null);

throwError = function(message) {
	Errors.insert({message: message});
}

// clearErrors = function() {
// 	Errors.remove({seen: true});
// }