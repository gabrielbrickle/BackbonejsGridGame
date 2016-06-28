module.exports = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.render, this);
    },
    events: {
        'click #start': 'clickStart',
        'click #smallplayer': 'clickSmall',
        'click #bigplayer': 'clickBig',
        'click #login': 'clickLogin',
        'click #play': 'clickPlay',
    },
    clickStart: function() {
        /////.start is coming from user models start function which get input box value and .....
        let userval = document.getElementById('input').value;
        this.model.start(userval);
    },
    clickLogin: function() {
      console.log('i clicked login');

        /////.start is coming from user models start function which get input box value and .....
    },
    clickPlay: function() {
      console.log('i clicked play');

        /////.start is coming from user models start function which get input box value and .....
    },
    clickSmall: function() {
        let char = document.getElementById('smallplayer');
        this.model.smallcharselect(char);

    },
    clickBig: function() {
            let char = document.getElementById('bigplayer');
            this.model.bigcharselect(char);
        },
    render: function() {
        let newName = this.el.querySelector('#newuser');
        newName.textContent = `Welcome, ${this.model.get('userName')}`;
    },
});
