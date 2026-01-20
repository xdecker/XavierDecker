import { formatForDateInput } from './dateformat';

describe('formatForDateInput', () => {
  it('should return empty string for null', () => {
    expect(formatForDateInput(null)).toBe('');
  });

  it('should return empty string for invalid date', () => {
    expect(formatForDateInput('invalid')).toBe('');
  });

  it('should format a valid string date in local time', () => {
    const inputStr = '2026-01-19';
    const date = new Date(inputStr);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const expected = `${yyyy}-${mm}-${dd}`;

    expect(formatForDateInput(inputStr)).toBe(expected);
  });

  it('should format a Date object', () => {
    const d = new Date(2026, 0, 19);
    expect(formatForDateInput(d)).toBe('2026-01-19');
  });
});
