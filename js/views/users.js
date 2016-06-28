module.exports = Backbone.View.extend({
    initialize: function() {
        ////on a change of the page, do this
        this.model.on('change', this.render, this);
    },
    events: {
        ///setting up the click event for start button which is #start in html
        'click #start': 'clickStart'
    },
    clickStart: function() {
        /////.start is coming from user models start function which get input box value and .....
        let userval = document.getElementById('input').value;
        this.model.start(userval);
    },
    render: function() {
        let newName = this.el.querySelector('#newuser');
        newName.textContent = `Welcome, ${this.model.get('userName')}`;
    }
});
