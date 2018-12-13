const flight = function () {

    const getAdd = function (ctx) {
        if(!userModel.isAuthorized()){
            ctx.redirect('#/login');
        }else{
            ctx.partial('views/flight/addFlight.hbs');
        }
    };

    const postAdd = function (ctx) {
        flightModel.add(ctx.params).then(function () {
            notifications.showInfo('Flight added');
            ctx.redirect('#/');
        }).catch(function (res) {
            notifications.handleError(res);
        });

    };

    const getMine = function (ctx) {
        flightModel.myFlights()
            .then(function (res) {
                ctx.flights=res;
                ctx.partial('views/flight/myFlights.hbs');
            })
            .catch(
            function (res) {
                notifications.handleError(res);
            }
        )
    };

    const details = function (ctx) {
        let flightId = ctx.params.id;
        let userInfo = storage.getData('userInfo');
        flightModel.details(flightId)
            .then(function (res) {
                ctx.flight=res;
                ctx.isPublisher = res._acl.creator === userInfo.id;
                ctx.partial('views/flight/flightDetails.hbs');
            })
            .catch(function (res) {
                notifications.handleError(res);
            });
    };

    const remove = function (ctx) {
        let flightId = ctx.params.id;
        flightModel.remove(flightId)
            .then(function (res) {
                notifications.showInfo('Flight deleted');
                ctx.redirect('#/flight/mine')
            })
            .catch(function (res) {
                notifications.handleError(res);
            });

    };

    const getEdit = function (ctx) {
        let flightId = ctx.params.id;
        storage.saveData('flightId',flightId);
        flightModel.details(flightId)
            .then(function (res) {
                ctx.flight=res;
                ctx.partial('views/flight/editFlight.hbs');
            })
            .catch(function (res) {
                notifications.handleError(res);
            });
    };

    const postEdit = function (ctx) {
        let flightId = storage.getData('flightId');
        // let flightId=ctx.params.id.replace(':','');
        flightModel.edit(flightId, ctx.params)
            .then(function (res) {
                notifications.showInfo('Successfully edited flight');
                ctx.redirect(`#/flight/details?id=${res._id}`);
            })
            .catch(function (res) {
                notifications.handleError(res);
            });

    };

    return {
        getAdd,
        postAdd,
        getMine,
        details,
        remove,
        getEdit,
        postEdit
    }
}();