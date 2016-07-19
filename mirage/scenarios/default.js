export default function(server) {
  for (var i = 0; i < 20; i++) {
    let employee = server.create('employee');
    let customer = server.create('customer');
    server.createList('issue', 40, { employee, customer } );
  }
}
