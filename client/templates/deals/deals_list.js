var dealsData = [{
    title: 'Dalla padella alla brace',
    author: 'Chef Luigi',
    url: 'http://potkettleblack.it/'
}, {
    title: 'Cavoli a merenda',
    author: 'Chef Toni',
    url: 'http://potkettleblack.it/'
}, {
    title: 'Zuppa e pan bagnato',
    author: 'Chef Carlo',
    url: 'http://potkettleblack.it/'
}];

Template.dealsList.helpers({
  deals: dealsData
});