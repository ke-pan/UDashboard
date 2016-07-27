import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    return Ember.$.get('/data/locations.csv').then(result => this.csv2json(result));
  },
  csv2json(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for(var i = 1; i < lines.length; i++){
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
