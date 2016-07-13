import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', {path: '/'}, function() {
    this.route('issues');
    this.route('locations');
    this.route('metrics');
  });
});

export default Router;
