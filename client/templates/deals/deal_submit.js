Template.dealSubmit.onRendered(function () {
    $(document).ready(function(){
        $(this).scrollTop(0);
    });
});

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
		var errors = validateDeal(deal);
		if (errors.title || errors.message)
			return Session.set('dealSubmitErrors', errors)

		Meteor.call('dealInsert', deal, function(error, result){
			// display the error to the user and abort
			if (error)
				return throwError(error.reason);

			// show this result and abort route away
			if (result.dealExists)
				return throwError('Questo menù è già presente');
			
			Router.go('dealPage', {_id: result._id});
		});
	},
});