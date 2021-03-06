const user = (function(){
    const getLogin = function(ctx){
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function(ctx){
        let username = ctx.params.username;
        let password = ctx.params.pass;
        let form = this.target;
        
        userModel.login(username, password).then(function(data){
            storage.saveUser(data);
            $(form).trigger('reset');
            notifications.showInfo('Login successful!');
            ctx.redirect('#/');
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    };

    const logout = function(ctx){
        userModel.logout().then(function(){
            storage.deleteUser();
            notifications.showInfo('Logout successful!');
            ctx.redirect('#/login');
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    };

    const getRegister = function(ctx) {
        ctx.partial('./views/user/register.hbs');
    };

    const postRegister = function(ctx) {
        let form = this.target;

        userModel.register(ctx.params).then(function(data){
            storage.saveUser(data);
            $(form).trigger('reset');
            notifications.showInfo('Registration successful!');
            ctx.redirect('#/');
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    };

    const initializeLogin = function(){
        let userInfo = storage.getData('userInfo');
        if(userModel.isAuthorized()){
            $('#welcome-name').text(`${userInfo.username}`);
            $('.user-not-init').removeClass('d-none');
            $('.user-init').addClass('d-none');
        }else{
            $('#welcome-name').text("");
            $('.user-not-init').addClass('d-none');
            $('.user-init').removeClass('d-none');
        }
    };

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        initializeLogin
    };
}());