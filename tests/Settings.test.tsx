import { render, fireEvent } from '@testing-library/react';
import Settings from '../src/Pages/Settings';


describe('Settings component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Settings />);
    const pageTitle = getByText('Page de paramètres');
    expect(pageTitle).toBeTruthy();
  });

  it('should change active item when clicked', () => {
    const { getByText } = render(<Settings />);
    const securityItem = getByText('Sécurité et vie privé');
    // Simulez un clic sur l'élément
    fireEvent.click(securityItem);
  });
});
