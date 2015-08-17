Air_lines = new Mongo.Collection("air_lines");
Flight_info = new Mongo.Collection("flight_info");

if (Meteor.isServer) {
    Meteor.publish('air_lines', function () {
        return Air_lines.find({}, {sort: {priority: -1}});
    });

    Meteor.publish('flight_info', function () {
        return Flight_info.find();
    });
}


if (Meteor.isClient) {

    $(function () {
        $('#arraivalDate').datepicker({
            dateFormat: 'yy/mm/dd'
        });
    })

    Meteor.subscribe("air_lines");
    Meteor.subscribe("flight_info");

    Template.flight_query.helpers({
        air_lines: function () {
            return Air_lines.find();
        }
    });

    Template.flight_query.events({
        "click #search": function (event) {
            console.log(event.target);
            event.preventDefault();
            var $leavedPort = $('#leaved_port');
            var $arrivalPort = $('#arrival_port');
            var $leavedAt = $('#arraivalDate');

            Session.set("leavedFrom", $leavedPort.val());
            Session.set("arrivalTo", $arrivalPort.val());
            Session.set("leavedAt", $leavedAt.val());
//            Flight_info.find({learvedFrom:$leavedPort.val(),arrivalTo:$arrivalPort.val(),leavedAt:$leavedAt.val()});
        }
    });

}