export default function() {
  this.namespace = 'api';

  this.get('/issues', function(schema, request) {
    console.log(request.queryParams.period);
    return schema.issues.all();
  });

  this.get('/customers');
}
