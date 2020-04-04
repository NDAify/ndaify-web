import getSuggestion from '../getEmailSuggestions';

test('should return the closest email provider', () => {
  expect(getSuggestion('julia@gmail.con')).toBe('julia@gmail.com');
  expect(getSuggestion('julia@gmali.con')).toBe('julia@gmail.com');
  expect(getSuggestion('julia@gmalii.con')).toBe('julia@gmail.com');
  expect(getSuggestion('julia@aol.con')).toBe('julia@aol.com');
  expect(getSuggestion('julia@hotmail.con')).toBe('julia@hotmail.com');
  expect(getSuggestion('julia@yakoo.com')).toBe('julia@yahoo.com');
  expect(getSuggestion('julia@iclous.com')).toBe('julia@icloud.com');
});

test('should return the closest tld', () => {
  expect(getSuggestion('julia@juliaqiu.con')).toBe('julia@juliaqiu.com');
  expect(getSuggestion('julia@slope.ninjw')).toBe('julia@slope.ninja');
  expect(getSuggestion('julia@juliaqiu.bear')).toBe('julia@juliaqiu.beer');
  expect(getSuggestion('julia@juliaqiu.arr')).toBe('julia@juliaqiu.art');
  expect(getSuggestion('julia@juliaqiu.edi')).toBe('julia@juliaqiu.edu');
  expect(getSuggestion('julia@juliaqiu.ed')).toBe('julia@juliaqiu.edu');
  expect(getSuggestion('julia@juliaqiu.cta')).toBe('julia@juliaqiu.cab');
});

test('should return null if no match', () => {
  expect(getSuggestion('julia@juliaqiu.com')).toBe(null);
  expect(getSuggestion('julia@slope.ninja')).toBe(null);
  expect(getSuggestion('julia@juliaqiu.beer')).toBe(null);
  expect(getSuggestion('julia@juliaqiu.co')).toBe(null);
});
