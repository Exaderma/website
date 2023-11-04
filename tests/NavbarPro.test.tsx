import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter est utilisé pour simuler le routage

import Navbar from '../src/components/NavbarPro';

test('Navbar renders correctly', () => {
  const { container } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});

test('Navbar toggles correctly when hamburger button is clicked', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const hamburgerButton = getByText('☰'); // Le texte du bouton hamburger dans votre composant
  fireEvent.click(hamburgerButton);

  // Vérifiez si la classe "closed" est ajoutée à la balise nav lorsque le bouton est cliqué
//   const navbar = getByText('Accueil').closest('nav'); // Remplacez 'Accueil' par le texte du lien dans votre composant

});