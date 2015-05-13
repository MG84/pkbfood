Template.requestEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentRequestId = this._id

		var requestPorpertues = {
			city: $(e.target).find('[name=city]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			people: $(e.target).find('[name=people]').val()
		}

		Requests.update(currentRequestId, {$set: requestProperties}, function(error){
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('requestPage', {_id: currentRequestId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this request?")) {
			var currentRequestId = this._id;
			Requests.remove(currentRequestId);
			Router.go('requestsList');
		}
	}
});