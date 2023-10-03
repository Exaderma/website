// import { render, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom'; // Import necessary routers
// import axios, { AxiosResponse } from 'axios'; // Import axios for mocking API calls
// import LinkPatient from './../src/Pages/LinkPatient'; // Adjust the import path as needed

// // Mock axios for API requests
// jest.mock('axios');
// const axiosMock = axios as jest.Mocked<typeof axios>;

// // Define a mock token object for testing
// const mockToken = {
//   token: 'your-mock-token',
// };

// describe('LinkPatient component', () => {
//   // Mock the navigate function using MemoryRouter
//   const renderComponent = () => {
//     return render(
//       <MemoryRouter>
//         <LinkPatient />
//       </MemoryRouter>
//     );
//   };

//   // Reset the axios mock after each test
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('handles form submission and displays success message', async () => {
//     // Mock axios.post to resolve with a success response
//     axiosMock.post.mockResolvedValue({
//       status: 201,
//       data: 'mock response data',
//     } as AxiosResponse);

//     const { getByText, getByPlaceholderText, getByTestId } = renderComponent();
//     const codeInput = getByPlaceholderText('Saisir le Code');
//     const submitButton = getByTestId('submit-button');

//     // Fill in the code input
//     fireEvent.change(codeInput, { target: { value: 'your-mock-code' } });

//     // Click the submit button
//     fireEvent.click(submitButton);

//     // Wait for the API call to complete
//     await waitFor(() => {
//       expect(axiosMock.post).toHaveBeenCalledWith(
//         'http://51.103.66.175:8080/patient/link',
//         { code: 'your-mock-code' },
//         {
//           headers: {
//             Authorization: `Bearer ${mockToken.token}`,
//           },
//         }
//       );
//     });

//     // Assert that the success message is displayed
//     const successMessage = getByText('Patient linked successfully');
//     expect(successMessage).toBeTruthy();
//   });

//   it('handles form submission and displays invalid code message', async () => {
//     // Mock axios.post to reject with a 400 response
//     axiosMock.post.mockRejectedValue({ response: { status: 400 } });

//     const { getByPlaceholderText, getByTestId, getByText } = renderComponent();
//     const codeInput = getByPlaceholderText('Saisir le Code');
//     const submitButton = getByTestId('submit-button');

//     // Fill in the code input
//     fireEvent.change(codeInput, { target: { value: 'invalid-mock-code' } });

//     // Click the submit button
//     fireEvent.click(submitButton);

//     // Wait for the API call to complete
//     await waitFor(() => {
//       expect(axiosMock.post).toHaveBeenCalledWith(
//         'http://51.103.66.175:8080/patient/link',
//         { code: 'invalid-mock-code' },
//         {
//           headers: {
//             Authorization: `Bearer ${mockToken.token}`,
//           },
//         }
//       );
//     });

//     // Assert that the invalid code message is displayed
//     const invalidCodeMessage = getByText('Invalid code');
//     expect(invalidCodeMessage).toBeTruthy();
//   });
// });