import createXForwardedFor from '../createXForwardedFor';

test('should ignore x-forwaded-for when null', () => {
  expect(
    createXForwardedFor(null, '1.1.1.1', '2.2.2.2'),
  ).toBe(
    '1.1.1.1, 2.2.2.2',
  );

  expect(
    createXForwardedFor(null, '1.1.1.1', '::ffff:2.2.2.2'),
  ).toBe(
    '1.1.1.1, ::ffff:2.2.2.2',
  );
});

test('should append correct proxy to x-forwaded-for when invalid', () => {
  expect(
    createXForwardedFor('8.8.8.8, 3.3.3.3, 1.1.1.2', '1.1.1.1', '::ffff:2.2.2.2'),
  ).toBe(
    '8.8.8.8, 3.3.3.3, 1.1.1.2, 1.1.1.1, ::ffff:2.2.2.2',
  );

  expect(
    createXForwardedFor('8.8.8.8,3.3.3.3,1.1.1.2', '1.1.1.1', '::ffff:2.2.2.2'),
  ).toBe(
    '8.8.8.8,3.3.3.3,1.1.1.2, 1.1.1.1, ::ffff:2.2.2.2',
  );
});

test('should handle ipv6 addresses correctly', () => {
  expect(
    createXForwardedFor('3.3.3.3, 7.7.7.7', '::ffff:7.7.7.7', '::ffff:2.2.2.2'),
  ).toBe(
    '3.3.3.3, 7.7.7.7, ::ffff:2.2.2.2',
  );

  expect(
    createXForwardedFor('3.3.3.3,7.7.7.7', '::ffff:7.7.7.7', '::ffff:2.2.2.2'),
  ).toBe(
    '3.3.3.3,7.7.7.7, ::ffff:2.2.2.2',
  );
});

test('should handle cases where client=proxy', () => {
  expect(
    createXForwardedFor('1.1.1.2', '1.1.1.1', '::ffff:2.2.2.2'),
  ).toBe(
    '1.1.1.2, 1.1.1.1, ::ffff:2.2.2.2',
  );

  expect(
    createXForwardedFor('7.7.7.7', '::ffff:7.7.7.7', '::ffff:2.2.2.2'),
  ).toBe(
    '7.7.7.7, ::ffff:2.2.2.2',
  );
});
