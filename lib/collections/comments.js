Comments = new Mongo.Collection('comments');

Meteor.methods({
	comment: function(commentAttributes) {
		var user = Meteor.user();
		var deal = Deals.findOne(commentAttributes.dealId);
		
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to make comments");

		if (!commentAttributes.body)
			throw new Meteor.Error(422, 'Please write some content');

		if (!deal)
			throw new Meteor.Error(422, 'You must comment on a deal');

		comment = _.extend(_.pick(commentAttributes, 'dealId', 'body'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});
		
		Deals.update(comment.dealId, {$inc: {commentsCount:1}});

		// create the comment, save the id
		comment._id = Comments.insert(comment);

		// create a notification, informing the deal owner of a new comment
		createCommentNotification(comment);

		return comment._id;
	}
});