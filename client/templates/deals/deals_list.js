Template.dealsList.helpers({
    deals: function() {
        return Deals.find();
    }
});