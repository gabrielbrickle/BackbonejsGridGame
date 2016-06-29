module.exports = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.render, this);
    },
    events: {
      'click #restart': 'clickRestart',
    },

    clickRestart: function() {
      console.log('restart');
        this.model.restart();
        // this.trigger('startover', this.model);//////FROM CLASS
    },
    render: function(){
      
    }
});



// going to need function to trigger game over event
