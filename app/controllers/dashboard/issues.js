import Ember from 'ember';
import moment from 'moment';
import _ from 'lodash';

export default Ember.Controller.extend({
  // queryParams: ['sort', 'dir'],
  sort: 'submissionAt',
  dir: 'desc',
  search: 'x',
  issues: Ember.computed('model', 'dir', 'sort', 'search', function() {
    let issues = this.get('model');
    let dir = this.get('dir');
    let sort = this.get('sort');
    let sorted = _.sortBy(issues, sort);
    if (dir === 'desc') { sorted = sorted.reverse(); }
    return (sorted
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
    },
    setSearch(text) {
      console.log(text);
      this.set('search', text);
    }
  }
});
