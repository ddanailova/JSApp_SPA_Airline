 const home = (function(){
    const index = function(ctx) {
        let filterFlights;
        ////Show on the home page only the public when not logged and all when logged
        // if(userModel.isAuthorized()){
        //     filterFlights = flightModel.flights(false);
        // }else{
        //     filterFlights = flightModel.flights(true);
        // }

        //Show on the home page only the public
        filterFlights = flightModel.flights(true);

        filterFlights
            .then(function (res) {
                ctx.flights = res;
                ctx.partial('views/home/index.hbs');
            })
            .catch(
                function (res) {
                    notifications.handleError(res);
                }
            );
    };

    return {
        index,
    };
}());