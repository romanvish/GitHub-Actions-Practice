import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DevProfileDashboard from '../src/DevProfileDashboard';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'test-repo', html_url: '#', description: 'Test Repo' }])
  })
);

describe('DevProfileDashboard', () => {
  it('renders input and button', () => {
    render(<DevProfileDashboard />);
    expect(screen.getByPlaceholderText(/github username/i)).toBeInTheDocument();
    expect(screen.getByText(/fetch repos/i)).toBeInTheDocument();
  });

  it('fetches and displays repos on button click', async () => {
    render(<DevProfileDashboard />);
    fireEvent.change(screen.getByPlaceholderText(/github username/i), { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText(/fetch repos/i));

    await waitFor(() => screen.getByText('test-repo'));
    expect(screen.getByText('test-repo')).toBeInTheDocument();
  });

  it('shows error for bad fetch', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
    render(<DevProfileDashboard />);
    fireEvent.change(screen.getByPlaceholderText(/github username/i), { target: { value: 'invaliduser' } });
    fireEvent.click(screen.getByText(/fetch repos/i));

    await waitFor(() => screen.getByText(/not found/i));
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
