import BaseSerializer from './application';
import moment from 'moment';
import _ from 'lodash';

export default BaseSerializer.extend({
  include: ['customer', 'employee'],
  serialize(object, request) {
    let json = BaseSerializer.prototype.serialize.apply(this, arguments);
    // console.log(request.queryParams);
    if (request.queryParams.sort) {
      json = _.sortBy(json, request.queryParams.sort);
    }
    if (request.queryParams.dir === 'desc') {
      json = _.reverse(json);
    }
    if (request.queryParams.page && request.queryParams.per) {
      json = _.slice(json, (request.queryParams.page - 1) * request.queryParams.per, request.queryParams.page * request.queryParams.per);
    }
    if (request.queryParams.period) {
      json = json.filter(function(issue) {
        return moment(issue.createdAt).format("YYYY-MM") == request.queryParams.period;
      })
    }
    return json;
  }
});
