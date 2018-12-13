const validateForm = function () {

    const user = function (selector) {
        $(selector).on('submit', function (ev) {
            let isFormValid = true;
            $('input').removeClass('is-invalid');
            $('.validation-massage').text('');
            let username = $('input[name="username"]');
            let password = $('input[name="pass"]');
            let confirmPass = $('input[name="checkPass"]');

            if (username.val().trim().length < 5) {
                isFormValid = false;
                username.addClass('is-invalid');
                $('#validate-username').text('The username must be more then 5 symbols');
            }

            if (password.val().trim().length === 0) {
                isFormValid = false;
                password.addClass('is-invalid');
                $('#validate-pass').text('The password is mandatory');
            }

            if (confirmPass) {
                if (password.val().trim() !== confirmPass.val().trim()) {
                    isFormValid = false;
                    password.addClass('is-invalid');
                    confirmPass.addClass('is-invalid');
                    $('#validate-pass').text('The passwords should match');
                    $('#validate-checkPass').text('The passwords should match');
                }
            }

            if (!isFormValid) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });
    };

    const flight = function (selector) {
        // //Realtime validation
        // let isFormValid = true;
        // let destination = $('input[name="destination"]');
        // $(`${selector} input[name="destination"]`).on('keydown', function () {
        //     if (destination.val().trim().length < 4) {
        //         isFormValid = false;
        //         destination.addClass('is-invalid');
        //         $('#validate-destination').text('Destination must be more then 4 symbols');
        //     }else{
        //         isFormValid = true;
        //         destination.removeClass('is-invalid');
        //         $('#validate-destination').text("");
        //     }
        // })
        $(selector).on('submit', function (ev) {
            let isFormValid = true;
            $('input').removeClass('is-invalid');
            $('.validation-massage').text('');
            let destination = $('input[name="destination"]');
            let origin = $('input[name="origin"]');
            let seats=$('input[name="seats"]');
            let cost=$('input[name="cost"]');
            let image=$('input[name="img"]');

            if (destination.val().trim().length === 0) {
                isFormValid = false;
                destination.addClass('is-invalid');
                $('#validate-destination').text('Destination is mandatory');
                destination.val('');
            }

            if (origin.val().trim().length === 0) {
                isFormValid = false;
                origin.addClass('is-invalid');
                $('#validate-origin').text('Origin is mandatory');
                origin.val('');
            }

            if (seats.val().trim() <= 0) {
                isFormValid = false;
                seats.addClass('is-invalid');
                $('#validate-seats').text('Seats should be more then zero');
                seats.val('');
            }

            if (cost.val().trim() <= 0) {
                isFormValid = false;
                cost.addClass('is-invalid');
                $('#validate-cost').text('Cost should be more then zero');
                cost.val('');
            }

            if (image.val().trim().length === 0) {
                isFormValid = false;
                image.addClass('is-invalid');
                $('#validate-img').text('Image is mandatory');
            }

            if (!isFormValid) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });
    };

    return {
        user,
        flight,
    }
}();