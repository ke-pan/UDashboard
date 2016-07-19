import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  closedAt() {
    if (this.status === 'closed') {
      return faker.date.between(this.createdAt, '2016-07-21');
    }
    return '';
  },
  createdAt() {
    return faker.date.between('2015-01-01', '2016-07-20');
  },
  description: "It is broken",
  status() {
    return faker.random.arrayElement(["opening","closed","closed"]);
  }
});
