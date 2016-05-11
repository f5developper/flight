//サーバ側でpublishしたキー名でコレクションを生成する。メテオはクライアントにも同一コレクションをもっているためこうやるとローカルのコレクションにアクセスできる
aggregateLowerPrice = new Mongo.Collection("aggregateLowerPrice");

// This code only runs on the client
Template.flight_query_result.helpers({
    flights: function () {
        if (Session.get("leavedFrom") || Session.get("arrivalTo") || Session.get("leavedAt")) {
            Meteor.subscribe("aggregateLowerPrice", Session.get("leavedFrom"), Session.get("arrivalTo"), Session.get("leavedAt"));
            return aggregateLowerPrice.find();
        }

    }
});

Template.flight_query_result.events({
    "click a": function (event) {
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
                        prices:[],
                        isNotice: "0",
                        shown: "0",
                    });
        }
    },
});
