import { Rule } from './model';

let rb: Rule;
beforeEach(() => {
  rb = new Rule();
});
describe('model', () => {
  test('RuleBuilder', () => {
    const r1 = rb
      .setOrder(1)
      .setTitle('Rule 1')
      .setValue('Rule 1 explains rule 1')
      .build();
    expect(r1.order).toEqual(1);
    expect(r1.title).toEqual('Rule 1');
    expect(r1.value).toEqual('Rule 1 explains rule 1');
  });
});
