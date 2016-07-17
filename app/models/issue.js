import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  closedAt: attr('string'),
  createdAt: attr('string'),
  customer: belongsTo('customer'),
  description: attr('string'),
  employee: belongsTo('employee'),
  status: attr('string')
});
