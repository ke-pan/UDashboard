import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Ember from 'ember';
import moment from 'moment';

export default Model.extend({
  closedAt: attr('string'),
  createdAt: attr('string'),
  customer: belongsTo('customer'),
  description: attr('string'),
  employee: belongsTo('employee'),
  status: attr('string'),

  createdDate: Ember.computed('createdAt', function() {
    return moment(this.get('createdAt')).format('YYYY-MM-DD');
  })
});
