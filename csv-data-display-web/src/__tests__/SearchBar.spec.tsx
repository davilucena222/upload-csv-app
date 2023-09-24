import { render, screen } from '@testing-library/react';
import { SearchBar } from '../components/SearchBar';

test('SearchBar renders correctly', () => {
  render(<SearchBar />);

  const searchInput = screen.getByPlaceholderText('Search for a data in the CSV file');
  const fileUploadButton = screen.getByText('Upload CSV');

  expect(searchInput).toBeInTheDocument();
  expect(fileUploadButton).toBeInTheDocument();
});