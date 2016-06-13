var air_lines_handle = Meteor.subscribe("air_lines");
Meteor.subscribe("notification");
Template.index.onRendered(function () {
    $('#arraivalDate').datepicker({
        dateFormat: 'yy/mm/dd'
    });
});

Template.index.onCreated(() => {
    let template = Template.instance();


    template.currentLeaved = new ReactiveVar();
    template.arrivaledAt = new ReactiveVar();
    template.lowerPrice = new ReactiveVar();
});

Template.index.helpers({
    leavedLines: () => {
        let optgroup = [];
        if (air_lines_handle.ready()) {
            let lines = Air_lines.find({}, {reactive: true}).fetch();
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
    },
    arrivalLines: () => {
        let optgroup = [];
        let arrivalResult = [];
        // if (air_lines_handle.ready()) {
        let lines = Template.instance().arrivaledAt.get();

        if (lines == undefined) {
            return [];
        }
        // var lines = Air_lines.find({}, {reactive: true}).fetch();
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

        $.each(optgroup, function (index, opt) {
            if (opt !== undefined) {
                arrivalResult.push(opt);
            }
        });
        return arrivalResult;
    },
    flights() {

        let lowerItems = Template.instance().lowerPrice.get();

        if (lowerItems === undefined) {
            return [];
        }
        $("#increase-day").removeClass("hide");

        return lowerItems;
        // if (Session.get("leavedFrom") || Session.get("arrivalTo") || Session.get("leavedAt")) {
        //     // Meteor.subscribe("aggregateLowerPrice", Session.get("leavedFrom"), Session.get("arrivalTo"), Session.get("leavedAt"));
        //     return aggregateLowerPrice(Session.get("leavedFrom"), Session.get("arrivalTo"), Session.get("leavedAt"));
        // }

    },
    dateIs(when) {
        var currentDate = Session.get("leavedAt");

        if(currentDate === undefined){
            return;
        }

        if (when == 'previous') {
            return moment(currentDate).subtract(1, 'days').format('< YYYY年MM月DD日');
        } else if (when == 'next') {
            return moment(currentDate).add(1, 'days').format('YYYY年MM月DD日 >');
        }
    }
});
Template.index.events({
    "click #search"(event, template) {
        event.preventDefault();
        var $leavedPort = $('#leaved_port');
        var $arrivalPort = $('#arrival_port');
        var $leavedAt = $('#arraivalDate');
        var $lowerPrice = $('#lowerPrice');
        $lowerPrice.val(5000);
        $lowerPrice.show();

        Meteor.call('aggregateLowerPrice', $leavedPort.val(), $arrivalPort.val(), $leavedAt.val(), (error, response) => {
            if (error) {
                Bert.alert(error.reason);
            } else {
                template.lowerPrice.set(response);
            }
        });
         Session.set("leavedFrom", $leavedPort.val());
         Session.set("leavedFromName", $('#leaved_port option:selected').text());
         Session.set("arrivalTo", $arrivalPort.val());
         Session.set("arrivalToName", $('#arrival_port option:selected').text());
        Session.set("leavedAt", $leavedAt.val());
    },
    "click #previous-day"(event) {
        event.preventDefault();
        var searchDate = moment(Session.get("leavedAt"));
        searchDate.subtract(1, 'days');
        var $leavedAt = $('#arraivalDate');
        $leavedAt.val(searchDate.format('YYYY/MM/DD'));
        $("#search").trigger('click');
    },
    "click #next-day"(event) {
        event.preventDefault();
        var searchDate = moment(Session.get("leavedAt"));
        searchDate.add(1, 'days');
        var $leavedAt = $('#arraivalDate');
        $leavedAt.val(searchDate.format('YYYY/MM/DD'));
        $("#search").trigger('click');
    },
    "change #leaved_port" (event, template) {
        event.preventDefault();

        let leavedPort = event.target.value;
        template.currentLeaved.set(leavedPort);

        let arrivals = Air_lines.findOne({code: leavedPort}, {fields: {destinations: 1, '_id': 0}});

        let result = Air_lines.find({code: {"$in": arrivals.destinations}});
        template.arrivaledAt.set(result.fetch());
    },
    "click a.btn-floating.yellow.darken-2": function (event) {
        event.preventDefault();
        var $leavedPort = Session.get("leavedFrom");
        var $leavedPortName = Session.get("leavedFromName");
        var $arrivalPort = Session.get("arrivalTo");
        var $arrivalPortName = Session.get("arrivalToName");
        var $leavedAt = Session.get("leavedAt");
        var $lowerPrice = $(this)[0]["amount"];

        if (Meteor.user() != undefined) {
            user = Meteor.user();
            Notification.insert(
                {
                    userId: user._id,
                    leavedPort: $leavedPort,
                    leavedPortName: $leavedPortName,
                    arrivalPort: $arrivalPort,
                    arrivalPortName: $arrivalPortName,
                    leavedAt: moment($leavedAt).toDate(),
                    noticeAmount: $lowerPrice,
                    prices: [],
                    isNotice: "0",
                    shown: "0",
                });
        }
    },
});
