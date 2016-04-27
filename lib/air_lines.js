Air_lines = new Mongo.Collection("air_lines");

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Air_lines.find().count() === 0) {
            air_lines_data.forEach(function (air_line, index) {
                Air_lines.insert(air_line);
            });
        }
    });

    Meteor.publish('air_lines', function () {
        return Air_lines.find({}, {sort: {priority: -1}});
    });

}

if (Meteor.isClient) {
    Template.registerHelper('formatDate', function (date) {
        return moment(date).format('YYYY年MM月DD日');
    });
    Template.registerHelper('formatDateTime', function (date) {
        return moment(date).format('YYYY年MM月DD日 HH時mm分');
    });
}

