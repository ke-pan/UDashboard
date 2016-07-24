export default function(server) {
  for (var i = 0; i < 60; i++) {
    let employee = server.create('employee');
    let customer = server.create('customer');
    server.createList('issue', 2, { employee, customer } );
  }

  server.loadFixtures('locations');
}
