import Ember from 'ember';
import moment from 'moment';
/* globals _ */

export default Ember.Controller.extend({
  sort: 'submissionAt',
  dir: 'desc',
  search: '',
  issues: Ember.computed('model', 'dir', 'sort', 'search', function() {
    let issues = this.get('model');
    let dir = this.get('dir');
    let sort = this.get('sort');
    let search = this.get('search');
    let result = _.sortBy(issues, sort);
    if (dir === 'desc') { result = result.reverse(); }
    if (!Ember.isBlank(search)) {
      result = _.filter(result, function(item) {
        for (var k in item) {
          if (item[k].indexOf(search) !== -1) {
            return true;
          }
        }
      });
    }
    return (result
      .map(function(item) {
        let closedTime = item.closedAt ? moment(item.closedAt).format('YY-MM-DD, kk:mm') : '';
        return {
          submissionTime: moment(item.submissionAt).format('YY-MM-DD, kk:mm'),
          closedTime,
          customerName: item.customerName,
          customerEmail: item.customerEmail,
          description: item.description,
          status: item.status,
          employeeName: item.employeeName
        };
      })
    );
  }),
  actions: {
    setSort(sort) {
      let dir = this.get('dir') === 'desc' ? 'asc' : 'desc';
      this.set('sort', sort);
      this.set('dir', dir);
    }
  }
});
