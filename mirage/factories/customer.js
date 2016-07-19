import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.name.findName();
  },
  email() {
    return faker.internet.email();
  }
});
