import { render, fireEvent } from '@testing-library/react';
import ProfilPro from '../src/Pages/ProfilPro';

describe('ProfilPro Component', () => {
  it('should render without errors', () => {
    const { container } = render(<ProfilPro />);
    expect(container).toBeTruthy();
  });

  it('should toggle edit mode when "Modifier" is clicked', () => {
    const { getByText } = render(<ProfilPro />);
    const modifierButton = getByText('Modifier');

    fireEvent.click(modifierButton);

    // Add assertions to test whether edit mode is toggled.
  });

  // Add more test cases as needed.
});