import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DevProfileDashboard from '../src/DevProfileDashboard';
import { vi, beforeEach, afterEach } from 'vitest';

// Mocking fetch globally
beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: 1,
        name: 'test-repo',
        html_url: '#',
        description: 'Test Repo',
      },
    ],
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('DevProfileDashboard', () => {
  it('renders input and button', () => {
    render(<DevProfileDashboard />);
    expect(screen.getByPlaceholderText(/Enter GitHub username/i)).toBeInTheDocument();
    expect(screen.getByText(/Fetch Repos/i)).toBeInTheDocument();
  });

  it('fetches and displays repos on button click', async () => {
    render(<DevProfileDashboard />);
    const input = screen.getByPlaceholderText(/Enter GitHub username/i);
    const button = screen.getByText(/Fetch Repos/i);

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);

    await waitFor(
      () => {
        expect(screen.getByText('test-repo')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('shows error for bad fetch', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    render(<DevProfileDashboard />);
    const input = screen.getByPlaceholderText(/Enter GitHub username/i);
    const button = screen.getByText(/Fetch Repos/i);

    fireEvent.change(input, { target: { value: 'invaliduser' } });
    fireEvent.click(button);

    await waitFor(
      () => {
        expect(screen.getByText('GitHub user not found')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});