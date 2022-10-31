import { screen, render } from '@testing-library/react';
import { TextSpotlight } from './textSpotlight';

describe('<TextSpotlight/>', () => {
    it('renders correctly', () => {
        render(<TextSpotlight>Sample text</TextSpotlight>);
        expect(screen.getByText('Sample text')).toBeInTheDocument();
    });
});
