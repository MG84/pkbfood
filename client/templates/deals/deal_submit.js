Template.dealSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var deal = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}

		Meteor.call('post', deal, function(error, id){
			if (error)
				return alert(error.reason);
			Router.go('dealPage', {_id: id});
		});
	}
});