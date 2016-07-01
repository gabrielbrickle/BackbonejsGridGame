module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.playertype.on('gotTypes', this.render, this);
        this.model.getUser();
    },
    events: {
        'click #start': 'clickStart',
        'click #login': 'clickLogin',
        'click #play': 'clickPlay',
        'click .playersize': 'clickCharButton',
    },
    clickStart: function() {

        let userval = document.getElementById('input').value;
        console.log('clicked start', userval);
        this.model.start(userval);
        console.log(event.target.textContent);
        // 'An event just happened'.
        this.trigger('play', this);

    },
    clickLogin: function() {
        console.log('i clicked login');
    },
    clickPlay: function() {
        console.log('i clicked play');
    },
    clickCharButton: function(event) {
        let char = event.target.textContent;
        console.log(event.target.textContent);
        this.model.setPlayerType(char);

        this.trigger('created', this.model);
    },

    render: function(){
      let renderButtons = this.el.querySelector('#buttonrender');
      renderButtons.innerHTML = '';
      this.model.playertype.forEach(function(element){
        let newbutton = document.createElement('button');
        newbutton.id = element.get('name');
        newbutton.classList.add('playersize');
        renderButtons.appendChild(newbutton);
        newbutton.textContent = element.get('name');
      })
      console.log(this.model.playertype);
    }

});
