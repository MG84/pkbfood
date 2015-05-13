Template.requestPage.helpers({
	comments: function() {
		return Comments.find({dealId: this._id});
	}
});