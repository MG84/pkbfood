Template.dealSubmit.onCreated(function(){
	Session.set('dealSubmitErrors', {});
});

Template.dealSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('dealSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('dealSubmitErrors')[field] ? 'has-error' : '';
	}

});

Template.dealSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var deal = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		var errors = validateDeal(deal);
		if (errors.title || errors.url)
			return Session.set('dealSubmitErrors', errors)

		Meteor.call('dealInsert', deal, function(error, result){
			// display the error to the user and abort
			if (error)
				return throwError(error.reason);

			// show this result and abort route away
			if (result.dealExists)
				return throwError('This link has already been posted');
			
			Router.go('dealPage', {_id: result._id});
		});
	}
});