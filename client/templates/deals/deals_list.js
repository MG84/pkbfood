Template.dealsList.helpers({
    deals: function() {
        return Deals.find({}, 
        	{ sort: {submitted: -1}});
    }
});