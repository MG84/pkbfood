Template.dealEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentDealId = this._id;

		var dealProperties = {
			// url: $(e.target).find('[name=url]').val(),
			city: $(e.target).find('[name=city]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			people: $(e.target).find('[name=people]').val(),
			price: $(e.target).find('[name=price]').val(),
			antipasto: $(e.target).find('[name=antipasto]').val(),
			primo: $(e.target).find('[name=primo]').val(),
			secondo: $(e.target).find('[name=secondo]').val(),
			dolce: $(e.target).find('[name=dolce]').val(),
			bevande: $(e.target).find('[name=bevande]').val()

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