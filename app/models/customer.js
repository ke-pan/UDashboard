import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';
import moment from 'moment';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  createdAt: attr('string'),
  email: attr('string'),
  name: attr('string'),

  createdMonth: Ember.computed('createdAt', function() {
    return moment(this.get('createdAt')).format('YYYY-MM');
  })
});
