
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
          var optgroup = {};
var lines = Air_lines.find();
         for(line in lines){
           if(line.region.region_code in optgroup){
             optgroup[line.region.region_code].push(line);
           }else{
             optgroup['region_name'] = [];
             optgroup['region_name'] = [];
               optgroup[line.region.region_code].push(line);
           }
         }
            return optgroup;
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
                            leavedAt: $leavedAt.val(),
                            amount: $lowerPrice.val(),
                            isNotice: "1",
                            shown: "0",
                        });
            }
        },
    });

}
