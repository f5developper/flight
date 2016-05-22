Air_lines = new Mongo.Collection("air_lines");



if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Air_lines.find().count() === 0) {
            air_lines_data.forEach(function (air_line, index) {
                Air_lines.insert(air_line);
            });
        }
    });

}

if (Meteor.isClient) {
    moment.locale('ja', {
        weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
        weekdaysShort: ["日","月","火","水","木","金","土"],
    });
    Template.registerHelper('formatDate', function (date) {
        return moment(date).format('YYYY/MM/DD(ddd)');
    });
    Template.registerHelper('formatDateTime', function (date) {
        return moment(date).format('YYYY/MM/DD(ddd) HH:mm');
    });
}
