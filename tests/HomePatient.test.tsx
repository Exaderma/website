import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import the router context
import HomePatient from './../src/Pages/HomePatient';

test('it renders the HomePatient component', () => {
  render(
    <BrowserRouter>
      <HomePatient />
    </BrowserRouter>
  );

  // Your test assertions here
  expect(screen.getByText('Ajouter un médecin')).toBeTruthy();
});