export default function() {
  this.namespace = 'api';

  this.get('/issues', function() {
    return(
      [
        {
          id: '1',
          closedAt: '',
          createdAt: '2016-7-14 08:00:00',
          customer: {
            id: '1',
            name: 'John Doe',
            email: 'John_Doe@example.com'
          },
          description: 'Something is broken',
          employee: null,
          // employee: {
          //   id: '2',
          //   name: 'Tom'
          // },
          status: 'opening'
        },
        {
          id: '2',
          closedAt: '2016-7-24 08:40:10',
          createdAt: '2016-7-23 08:03:02',
          customer: {
            id: '2',
            name: 'Smith Doe',
            email: 'Smith_Doe@example.com'
          },
          description: 'Something is going wrong',
          employee: {
            id: '1',
            name: 'Jerry'
          },
          status: 'closed'
        },
      ]
    );
  });
}
