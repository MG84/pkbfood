Template.dealEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentDealId = this._id

		var dealProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}

		Deals.update(currentDealId, {$set: dealProperties}, function(error) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('dealPage', {_id: currentDealId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this deal?")) {
			var currentDealId = this._id;
			Deals.remove(currentDealId);
			Router.go('dealsList');
		}
	}
});