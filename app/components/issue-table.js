import Ember from 'ember';
import Table from 'ember-light-table';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['issue-table'],
  sortedIssues: computed.sort('issues', 'sortProperties'),
  dir: 'desc',
  sort: 'createdAt',
  sortProperties: computed('dir', 'sort', function() {
    return [`${this.get('sort')}:${this.get('dir')}`];
  }),
  table: null,

  columns: computed(function() {
    return [{
      label: 'Submission Time',
      valuePath: 'createdAt'
    }, {
      label: 'Customer Name',
      valuePath: 'customer.name'
    }, {
      label: 'Customer Email',
      valuePath: 'customer.email'
    }, {
      label: 'Description',
      valuePath: 'description'
    }, {
      label: 'Employee',
      valuePath: 'employee.name'
    }, {
      label: 'Status',
      valuePath: 'status'
    }, {
      label: 'Close Time',
      valuePath: 'closedAt'
    }];
  }),

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns'), this.get('sortedIssues')));
  },

  actions: {
    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath')
        });
        this.get('table').setRows(this.get('sortedIssues'));
      }
    }
  }

});
