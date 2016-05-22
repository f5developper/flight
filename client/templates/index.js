
var air_lines_handle = Meteor.subscribe("air_lines");
//Meteor.subscribe("flight_info");
Meteor.subscribe("notification");
Template.index.onRendered(function () {
    $('#arraivalDate').datepicker({
        dateFormat: 'yy/mm/dd'
    });
});

Template.index.helpers({
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

Template.index.events({
    "click #search": function (event) {
        event.preventDefault();
        var $leavedPort = $('#leaved_port');
        var $arrivalPort = $('#arrival_port');
        var $leavedAt = $('#arraivalDate');
        var $lowerPrice = $('#lowerPrice');

        $lowerPrice.val(5000);
        $lowerPrice.show();

        Session.set("leavedFrom", $leavedPort.val());
        Session.set("leavedFromName", $('#leaved_port option:selected').text());
        Session.set("arrivalTo", $arrivalPort.val());
        Session.set("arrivalToName", $('#arrival_port option:selected').text());
        Session.set("leavedAt", $leavedAt.val());
    },
    "click #previous-day": function (event) {
        event.preventDefault();

        var searchDate = moment(Session.get("leavedAt"));
        searchDate.subtract(1, 'days');
        var $leavedAt = $('#arraivalDate');
        $leavedAt.val(searchDate.format('YYYY/MM/DD'));
        $("#search").trigger('click');

    },
    "click #next-day": function (event) {
        event.preventDefault();

        var searchDate = moment(Session.get("leavedAt"));
        searchDate.add(1, 'days');
        var $leavedAt = $('#arraivalDate');
        $leavedAt.val(searchDate.format('YYYY/MM/DD'));
        $("#search").trigger('click');
    },
});
        
Template.index.helpers({
    dateIs(when) {
        var currentDate = Session.get("leavedAt");

        if(when == 'previous'){
            return moment(currentDate).subtract(1,'days').format('< YYYY年MM月DD日');
        }else if(when == 'next'){
            return moment(currentDate).add(1,'days').format('YYYY年MM月DD日 >');
        }
    }
});
