Template.dealSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var deal = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}

		Meteor.call('deal', deal, function(error, id){
			if (error) {
				throwError(error.reason);
				if (error.error === 302)
					Router.go('dealPage', {_id: error.details})
			} else {
				Router.go('dealPage', {_id: id});
			}
		});
	}
});