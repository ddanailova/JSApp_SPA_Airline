const app = Sammy('#container', function(){
    this.use('Handlebars', 'hbs');
    this.before({except: {}}, function() {
        user.initializeLogin();
    });

    this.get('#/', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);
    this.get('#/flight/add', flight.getAdd);
    this.post('#/flight/add', flight.postAdd);
    this.get('#/flight/mine', flight.getMine);
    this.get('#/flight/details', flight.details);
    this.get('#/flight/remove', flight.remove);
    this.get('#/flight/edit', flight.getEdit);
    this.put('#/flight/edit', flight.postEdit);
});

$(function(){
    app.run('#/');
});