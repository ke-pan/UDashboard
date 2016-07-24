import Ember from 'ember';
import Table from 'ember-light-table';

const { isEmpty, computed } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['issue-table'],
  table: null,
  page: 0,
  per: 20,
  sort: "createdAt",
  dir: "desc",
  isLoading: false,
  canLoadMore: true,

  columns: computed(function() {
    return [{
      label: 'Submission Time',
      valuePath: 'createdTime'
    }, {
      label: 'Customer Name',
      valuePath: 'customer.name'
    }, {
      label: 'Customer Email',
      valuePath: 'customer.email',
      width: '220em'
    }, {
      label: 'Description',
      valuePath: 'description',
      sortable: false
    }, {
      label: 'Employee',
      valuePath: 'employee.name'
    }, {
      label: 'Status',
      valuePath: 'status'
    }, {
      label: 'Close Time',
      valuePath: 'closedTime'
    }];
  }),

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns')));
  },

  fetchRecords() {
    this.set('isLoading', true);
    this.get('store').query('issue', this.getProperties(['page', 'per', 'sort', 'dir'])).then(records => {
      this.get('table').addRows(records);
      this.set('isLoading', false);
      this.set('canLoadMore', !isEmpty(records));
    });
  },

  actions: {
    onColumnClick(column) {
      // console.log('properties:', this.getProperties(['page', 'per', 'sort', 'dir', 'canLoadMore', 'isLoading']));
      if (column.sorted) {
        let dir = column.ascending ? 'asc' : 'desc';
        let sort = column.get('valuePath');
        if (sort === 'closedTime') { sort = 'closedAt'; }
        if (sort === 'createdTime') { sort = 'createdAt'; }
        this.setProperties({
          dir,
          sort,
          page: 1
        });
        this.get('table').setRows([]);
        this.fetchRecords();
      }
      // console.log('properties:', this.getProperties(['page', 'per', 'sort', 'dir', 'canLoadMore', 'isLoading']));
    },
    onScrolledToBottom() {
      // console.log('properties:', this.getProperties(['page', 'per', 'sort', 'dir', 'canLoadMore', 'isLoading']));
      if(this.get('canLoadMore')) {
        console.log('scroll', this.get('page'));
        this.incrementProperty('page');
        this.fetchRecords();
      }
      // console.log('properties:', this.getProperties(['page', 'per', 'sort', 'dir', 'canLoadMore', 'isLoading']));
    }
  }

});
