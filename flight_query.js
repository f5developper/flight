
if (Meteor.isClient) {

    Meteor.subscribe("air_lines");
    Meteor.subscribe("flight_info");
    Meteor.subscribe("notification");


    Template.flight_query.onRendered(function () {
        $('#arraivalDate').datepicker({
            dateFormat: 'yy/mm/dd'
        });
    });

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
            var $lowerPrice = $('#lowerPrice');

            $lowerPrice.val(5000);
            $lowerPrice.show();

            Session.set("leavedFrom", $leavedPort.val());
            Session.set("arrivalTo", $arrivalPort.val());
            Session.set("leavedAt", $leavedAt.val());
        },
        "click #monitor": function (event) {
            event.preventDefault();
            var $leavedPort = $('#leaved_port');
            var $arrivalPort = $('#arrival_port');
            var $leavedAt = $('#arraivalDate');
            var $lowerPrice = $('#lowerPrice');

            if (Meteor.user() != undefined) {
                user = Meteor.user();
                user._id;
                console.log(Notification.insert(
                        {userId: user._id,
                            leavedPort: $leavedPort.val(),
                            arrivalPort: $arrivalPort.val(),
                            leavedAt: $leavedAt.val(),
                            amount: $lowerPrice.val(),
                            isNotice: "1"
                        }));
            }

        },
    });

}