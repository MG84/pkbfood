// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
}

// check that the user is the same
sameUser = function(userId, user) {
	return user && user.id == userId;
}