import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["sort", "dir", "page", "per"],
  page: 1,
  per: 20,
  sort: null,
  dir: "asc",
  actions: {
    setSort(sort, dir) {
      this.set('page', 1);
      this.set('sort', sort);
      this.set('dir', dir);
    },
    increamentPage(page) {
      this.set('page', this.get('page') + 1);
      this.send('getMoreIssues', this.get('page'), this.get('per'), this.get('sort'), this.get('dir'));
    },
    getMoreIssues(page, per, sort, dir) {
      return true;
    }
  }
});
