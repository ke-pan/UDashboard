import BaseSerializer from './application';
import moment from 'moment';

export default BaseSerializer.extend({
  include: ['customer', 'employee'],
  serialize(object, request) {
    let json = BaseSerializer.prototype.serialize.apply(this, arguments);
    if (request.queryParams.period) {
      return json.filter(function(issue) {
        return moment(issue.createdAt).format("YYYY-MM") == request.queryParams.period
      })
    }
    return json;
  }
});
