import { formatDate } from './dateFormat';
import dayjs from 'dayjs';

jest.mock('dayjs', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('dateFormat', () => {
  it('should format the date correctly', () => {
    const mockDate = '2024-03-08T12:34:56.789Z';
    const expectedFormattedDate = '2024/03/08 12/34/56';

    // Mock the dayjs function to return the mock date
    (dayjs as unknown as jest.Mock).mockReturnValueOnce({
      format: jest.fn().mockReturnValue(expectedFormattedDate),
    });

    const result = formatDate(mockDate);

    expect(result).toBe(expectedFormattedDate);
  });
});
