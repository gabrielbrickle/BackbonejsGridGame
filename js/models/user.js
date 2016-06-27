module.exports = Backbone.Model.extend({
    defaults: {
        userName: "gabe"
    },
    start: function(userval) {
        this.set('userName', userval)
    }
});
