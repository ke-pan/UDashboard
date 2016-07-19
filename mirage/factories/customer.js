import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.name.findName();
  },
  email() {
    return faker.internet.email();
  },
  createdAt() {
    return faker.date.between("2015-08-01", "2016-07-21");
  }
});
