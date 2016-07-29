import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      issues: Ember.$.get('/data/monthly_issue_count.csv').then(this.csv2json),
      customers: Ember.$.get('/data/monthly_customer_count.csv').then(this.csv2json),
      openingIssues: Ember.$.getJSON('/data/opening_issue.json')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.set('refreshing', true);
    Ember.run.later(this, this.refresh, 3000);
  },
  refresh() {
    this._super();
    if (this.get('refreshing')) {
      Ember.run.later(this, this.refresh, 3000);
    }
  },
  actions: {
    willTransition() {
      this.set('refreshing', false);
    }
  },
  csv2json(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for(var i = 1; i < lines.length - 1; i++){
  	  var obj = {};
  	  var currentline = lines[i].split(",");

  	  for(var j = 0; j < headers.length; j++){
  		  obj[headers[j]] = currentline[j];
  	  }

  	  result.push(obj);
    }
    return result;
  }
});
