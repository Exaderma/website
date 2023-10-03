import React from 'react';
import { render, screen  } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import LoginPage from './../src/Pages/Login';

// Wrap your test component with MemoryRouter
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

test('it renders the LoginPage component', () => {
  renderWithRouter(<LoginPage />);
  
  // Use the toBeInTheDocument matcher with the correct type assertion
  expect(screen.getByText('Se connecter')).toBeTruthy();
});

// test('it handles form submission correctly', async () => {
//   renderWithRouter(<LoginPage />);
  
//   // Fill in the form inputs
//   const emailInput = screen.getByPlaceholderText('Adresse mail') as HTMLInputElement;
//   const passwordInput = screen.getByPlaceholderText('Mot de passe') as HTMLInputElement;
//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   fireEvent.change(passwordInput, { target: { value: 'password123' } });

//   // Submit the form
//   const submitButton = screen.getByText('Se connecter');
//   fireEvent.click(submitButton);

//   // Use the toBeInTheDocument matcher with the correct type assertion
//   await waitFor(() => {
//     expect(screen.getByText('Connected successfully')).toBeTruthy();
//   }, { timeout: 10000 }); // Increase the timeout to 10 seconds
// });