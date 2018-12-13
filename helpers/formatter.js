const formatter = function () {

    const formatDate = function () {
        Handlebars.registerHelper("formatDate", function(date) {
            const monthName ={
                "01":"January",
                "02":"February",
                "03":"March",
                "04":"April",
                "05":"May",
                "06":"June",
                "07":"July",
                "08":"August",
                "09":"September",
                "10":"October",
                "11":"November",
                "12":"December"

            };
            let [year, month, day] = date.split("-");

            return`${day} ${monthName[month]}`;
        });
    };

    return {
        formatDate,
    }
}();