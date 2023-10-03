import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import GenerateLinkPro from './../src/Pages/GenerateLinkPro'; // Update the path


test('it renders the GenerateLinkPro component', () => {
    render(<BrowserRouter>
        <GenerateLinkPro />
      </BrowserRouter>);

    // Your test assertions here
    expect(screen.getByText("Rentrez l'email correspondant à votre nouveau patient. Une fois le code généré, il sera affiché ci-dessous.")).toBeTruthy();
    // Add more assertions as needed
  });