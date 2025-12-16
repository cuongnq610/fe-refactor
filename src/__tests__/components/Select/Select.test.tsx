import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select } from '@/components/Select';

describe('Select Component', () => {
  it('should render select element', () => {
    const { container } = render(<Select />);
    const select = container.querySelector('select');

    expect(select).toBeInTheDocument();
  });

  it('should render placeholder option by default', () => {
    const { container } = render(<Select />);
    const options = container.querySelectorAll('option');

    expect(options[0]).toHaveTextContent('Select...');
    expect(options[0]).toHaveValue('');
  });

  it('should render with custom placeholder text', () => {
    const { container } = render(<Select placeholder="Choose an option" />);
    const options = container.querySelectorAll('option');

    expect(options[0]).toHaveTextContent('Choose an option');
  });

  it('should hide placeholder option when hidePlaceholderOption is true', () => {
    const { container } = render(<Select hidePlaceholderOption={true} />);
    const options = container.querySelectorAll('option');

    expect(options.length).toBe(0);
  });

  it('should render all provided options', () => {
    const options = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ];

    const { container } = render(
      <Select options={options} hidePlaceholderOption={true} />
    );

    const optionElements = container.querySelectorAll('option');
    expect(optionElements).toHaveLength(3);
    expect(optionElements[0]).toHaveTextContent('Option 1');
    expect(optionElements[1]).toHaveTextContent('Option 2');
    expect(optionElements[2]).toHaveTextContent('Option 3');
  });

  it('should handle selected value', () => {
    const options = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ];

    // Using defaultValue for uncontrolled test - avoids React warning about
    // controlled component without onChange
    const { container } = render(
      <Select options={options} defaultValue="opt2" />
    );

    const select = container.querySelector('select') as HTMLSelectElement;
    expect(select.value).toBe('opt2');
  });
});
