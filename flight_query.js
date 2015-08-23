
if (Meteor.isClient) {

    Meteor.subscribe("air_lines");
    Meteor.subscribe("flight_info");


    $(function () {
        $('#arraivalDate').datepicker({
            dateFormat: 'yy/mm/dd'
        });

    })

    Template.flight_query.helpers({
        air_lines: function () {
            return Air_lines.find();
        }

    });

    Template.flight_query.events({
        "click #search": function (event) {
            event.preventDefault();
            var $leavedPort = $('#leaved_port');
            var $arrivalPort = $('#arrival_port');
            var $leavedAt = $('#arraivalDate');


            Session.set("leavedFrom", $leavedPort.val());
            Session.set("arrivalTo", $arrivalPort.val());
            Session.set("leavedAt", $leavedAt.val());
        },
        "click #monitor": function (event) {
            event.preventDefault();
            var $leavedPort = $('#leaved_port');
            var $arrivalPort = $('#arrival_port');
            var $leavedAt = $('#arraivalDate');

            if (Meteor.user() !== undefined) {
                user = Meteor.user();
                console.log(user._id);
                console.log(user.emails);
                console.log(Meteor.user());
            }

        },
    });

}