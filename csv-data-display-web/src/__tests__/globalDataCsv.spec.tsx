import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { GlobalDataCsvProvider, useGlobalDataCsv } from '../context/global-data-csv';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

interface MockDataProps {
  id: string;
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}[]

test('Testing the context GlobalDataCsv', async () => {
  const mockData = [
    {
      id: '1',
      name: 'John Doe',
      city: 'New York',
      country: 'United States',
      favorite_sport: 'Basketball',
    },
    {
      id: '2',
      name: 'Jane Doe',
      city: 'London',
      country: 'United Kingdom',
      favorite_sport: 'Football',
    },
  ] as MockDataProps[];

  mock.onGet('/api/users').reply(200, mockData);

  const { getByPlaceholderText } = render(
    <GlobalDataCsvProvider>
      <ComponentQueUsaContexto />
    </GlobalDataCsvProvider>
  );

  const expectedData = [
    {
      id: "1",
      name: "John Doe",
      city: "New York",
      country: "United States",
      favorite_sport: "Basketball",
    },
    {
      id: "2",
      name: "Jane Doe",
      city: "London",
      country: "United Kingdom",
      favorite_sport: "Football",
    },
  ];

  expect(expectedData).toEqual(mockData);

  const input = getByPlaceholderText('Search');
  fireEvent.change(input, { target: { value: expectedData["John Doe"] } });
});

function ComponentQueUsaContexto() {
  const { csvData, handleInputChange } = useGlobalDataCsv();

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <ul>
        {csvData.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}