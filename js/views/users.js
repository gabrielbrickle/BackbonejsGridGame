module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },
    events: {
        'click #start': 'clickStart',
        'click #login': 'clickLogin',
        'click #play': 'clickPlay',
        'click #smallplayer': 'clickSmall',
        'click #bigplayer': 'clickBig',
    },
    clickStart: function() {
      console.log('clicked start');
        let userval = document.getElementById('input').value;
        this.model.start(userval);
        // 'An event just happened'.
        this.trigger('play', this);



    },
    clickLogin: function() {
        console.log('i clicked login');
    },
    clickPlay: function() {
        console.log('i clicked play');
    },
    clickBig: function() {
        let char = document.getElementById('bigplayer').value;
        this.model.bigcharselect(char);
        this.trigger('created', this.model);/////NEW

    },
    clickSmall: function() {
        let char = document.getElementById('smallplayer').value;
        this.model.smallcharselect(char);
        this.trigger('created', this.model);//////NEW

    },
    render: function() {
        let newName = this.el.querySelector('#newuser');
        newName.textContent = `Welcome, ${this.model.get('userName')}`;
    },
});
