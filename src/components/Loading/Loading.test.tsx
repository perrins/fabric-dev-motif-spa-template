import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading component', () => {
  it('should render MotifProgressLoader', () => {
    render(<Loading />);
    const loader = screen.getByTestId('motif-progress-loader');
    expect(loader).toBeInTheDocument();
  });
});