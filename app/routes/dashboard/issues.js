import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    sort: {
      refreshModel: true
    },
    dir: {
      refreshModel: true
    }
  },
  model(params) {
    return this.store.query('issue', {page: params.page, per: params.per, sort: params.sort, dir: params.dir});
  },
  actions: {
    increamentPage() {
      model.pushObjects(this.store.query('issue', {page: params.page, per: params.per, sort: params.sort, dir: params.dir}));
    }
  }
});
