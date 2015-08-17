
if (Meteor.isClient) {
    Template.registerHelper('formatDate', function (date) {
        return moment(date).format('YYYY年MM月DD日');
    });
    Template.registerHelper('formatDateTime', function (date) {
        return moment(date).format('YYYY年MM月DD日 hh時mm分');
    });
}

