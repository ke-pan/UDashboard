export default function() {
  this.namespace = 'api';

  this.get('/issues', function(schema, request) {
    return schema.issues.all();
  });

  this.get('/customers');
  this.get('/locations');
}
