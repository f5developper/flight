
var air_lines_handle = Meteor.subscribe("air_lines");
Meteor.subscribe("flight_info");
Meteor.subscribe("notification");
Template.flight_query.onRendered(function () {
    $('#arraivalDate').datepicker({
        dateFormat: 'yy/mm/dd'
    });
});

Template.flight_query.helpers({
    air_lines: function () {
        var optgroup = [];

        if (air_lines_handle.ready()) {
            var lines = Air_lines.find({}, {reactive: true}).fetch();

            /**
             * air_lineコレクションからoptroupに適した形に変換
             */
            $.each(lines, function (index, line) {
                if (optgroup.hasOwnProperty(line.region.region_code) === false) {
                    optgroup[line.region.region_code] = [];
                    optgroup[line.region.region_code]["region_name"] = line.region.region_name;
                    optgroup[line.region.region_code]["regions"] = [];
                }
                optgroup[line.region.region_code]["regions"].push(line);
            });

            return optgroup;
        }
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
        var leavedPortName = $('#leaved_port option:selected').text();
        var $arrivalPort = $('#arrival_port');
        var arrivalPortName = $('#arrival_port option:selected').text();
        var $leavedAt = $('#arraivalDate');
        var $lowerPrice = $('#lowerPrice');

        if (Meteor.user() != undefined) {
            user = Meteor.user();
            Notification.insert(
                    {
                        userId: user._id,
                        leavedPort: $leavedPort.val(),
                        leavedPortName: leavedPortName,
                        arrivalPort: $arrivalPort.val(),
                        arrivalPortName: arrivalPortName,
                        leavedAt: moment($leavedAt.val()).toDate(),
                        noticeAmount: $lowerPrice.val(),
                        prices:[],
                        isNotice: "0",
                        shown: "0",
                    });
        }
    },
    "mouseover .flight_query_form": function (event) {

        $(".flight_query_form").addClass("shadow-z-4");
    }
});
