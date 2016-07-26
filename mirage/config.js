export default function() {

  this.passthrough();
  this.namespace = 'api';

  this.get('/issues', function(schema) {
    return schema.issues.all();
  });

  this.get('/customers');
  this.get('/locations');
}
