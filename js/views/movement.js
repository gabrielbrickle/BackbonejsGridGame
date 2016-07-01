
module.exports = Backbone.View.extend({
    initialize: function() {
      this.model.on('change', this.render, this);
    },
    /////click events object for the functions listed below
    events: {
        'click #up': 'clickUp',
        'click #down': 'clickDown',
        'click #left': 'clickLeft',
        'click #right': 'clickRight',
        'click #restart': 'clickRestart',
    },
    //////modify these so that energy level and # of moves logs every time a click happens
    clickUp: function() {
        this.model.up();
        // this.model.sendScores();
    },
    clickDown: function() {
        this.model.down();
        // this.model.sendScores();

    },
    clickLeft: function() {
        this.model.left();
        // this.model.sendScores();

    },
    clickRight: function() {
        this.model.right();
        // this.model.sendScores();
    },
    clickRestart: function() {
        this.model.restart();
    },

    gridGenerator: function(){
      let gridGameGrid = document.getElementById('grid');
      gridGameGrid.innerHTML = '';
      let size = 10;
      for (var y = 0; y < size; y++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (var x = 0; x < size; x++ ) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
        if (this.model.get('yNumber') === y && this.model.get('xNumber') === x){ //////From Logan 
          cell.setAttribute('id', 'player');
        }
      }
      gridGameGrid.appendChild(row);
    }
    // document.getElementById('grid')
  },
    /////render function makes it so that #upxy changes from "-" to whatever number is
    render: function() {
      console.log('rendering');
      let upbutton = this.el.querySelector('#yaxis');
        upbutton.textContent = this.model.get('yNumber');

      let downbutton = this.el.querySelector('#yaxis');
        downbutton.textContent = this.model.get('yNumber');

      let leftbutton = this.el.querySelector('#xaxis');
        leftbutton.textContent = this.model.get('xNumber');

      let rightbutton = this.el.querySelector('#xaxis');
        rightbutton.textContent = this.model.get('xNumber');

      let anybuttonclick = this.el.querySelector('#movecount');
        anybuttonclick.textContent = `Move Count: ${this.model.get('score')}`;

      let energycount = this.el.querySelector('#energy');
      energycount.textContent = `Energy Level: ${this.model.get('startingEnergy')}`;

      this.gridGenerator();
    }
});
