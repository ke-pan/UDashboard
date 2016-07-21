import Ember from 'ember';
import Table from 'ember-light-table';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['issue-table'],
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
    this.set('table', new Table(this.get('columns'), this.get('issues')));
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.get('table').setRows(this.get('issues'));
  },

  actions: {
    onColumnClick(column) {
      if (column.sorted) {
        let dir = column.ascending ? 'asc' : 'desc';
        let sort = column.get('valuePath');
        this.get('setSort')(sort, dir);
      }
    }
  }

});
