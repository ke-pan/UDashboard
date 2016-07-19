export default function(server) {
  let employee = server.create('employee');
  let customer = server.create('customer');
  server.createList('issue', 20, { employee, customer });
}
