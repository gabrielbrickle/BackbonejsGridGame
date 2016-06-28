// /////multi page views on site. doesn't render, but determines what will render
// let userRouter = Backbone.Router.extend(({
//   initialize: function(){
//     ///copy pasted everything from the main js window event listener
//   }
//   ////this will contain the url's to my pages
//   ///have to go back to the events on my movement.js views and add a new function that acts on the click of these url's
//   ///have to add a tags into html
//   ////
//   ////have to add to window event listener let router= newuserRouter Backbone.history.start();
//   routes: function(){
//     'currentgame': 'currentGame';
//     'login': 'loginPage'
//   }
//   currentGame: function(){
//     console.log("i'm in the current game page");
//     ///HIDE THE LOGIN, SHOW THE GAME CONTROLS
//     this.userView.el.classList.add('hidden');///have to create model view and userview
//     this.modelView.el.classList.remove('hidden')
//   }
//   loginPage: function(){
//     console.log("i'm in the login page");
//     this.modelView.el.classList.remove('hidden')
//     this.userView.el.classList.add('hidden');
//   }
//
// })
