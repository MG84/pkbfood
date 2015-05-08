Template.dealSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var deal = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}

		deal._id = Deals.insert(deal);
		Router.go('dealPage', deal);
	}
});