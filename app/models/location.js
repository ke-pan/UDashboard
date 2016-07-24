import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  lat: attr('string'),
  lon: attr('string'),
  name: attr('string'),
  employeeCount: attr('number')
});
