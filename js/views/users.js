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
        'click #Small': 'clickSmall',
        'click #Large': 'clickBig',
        // 'click #Gargantuan': 'clickBig',
        'click button': 'clickChar'
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
    clickBig: function() {
        let char = document.getElementById('Large').value;
        console.log(event.target.textContent);
        this.model.bigcharselect(char);
        this.trigger('created', this.model);

    },
    clickSmall: function() {
        let char = document.getElementById('Small').value;
        this.model.smallcharselect(char);
        this.trigger('created', this.model);

    },
    render: function(){
      let renderButtons = this.el.querySelector('#buttonrender');
      renderButtons.innerHTML = '';
      this.model.playertype.forEach(function(element){
        let newbutton = document.createElement('button');
        newbutton.id = element.get('name');
        renderButtons.appendChild(newbutton);
        newbutton.textContent = element.get('name');
      })
      console.log(this.model.playertype);
    }

});
