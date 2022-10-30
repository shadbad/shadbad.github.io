import { render, screen } from '@testing-library/react';
import { App } from '.';

test('renders the heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'shadbad.github.io' })).toBeInTheDocument();
});
