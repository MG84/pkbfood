Template.requestSubmit.onRendered(function () {
    $(document).ready(function(){
        $(this).scrollTop(0);
    });
});

Template.requestSubmit.onCreated(function(){
	Session.set('requestSubmitErrors', {});
});

Template.requestSubmit.helpers({
	errorMessage: function(field){
		return Session.get('requestSubmitErrors')[field];
	},
	errorClass: function(field){
		return !!Session.get('requestSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.requestSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var deal = {
			city: $(e.target).find('[name=city]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			people: $(e.target).find('[name=people]').val()
		}
		var errors = validateRequest(request);
		if (errors.title || errors.message)
			return Session.set('requestSubmitErrors', errors)

		Meteor.call('requestInsert', request, function(error, result){

			if (error)
				return throwError(error.reason);

			if (result.requestExists)
				return throwError('Questa richiesta è già presente');

			Router.go('requestPage', {_id: result._id});
		});
	}
});