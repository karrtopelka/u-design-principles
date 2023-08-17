import React, { useState, useRef, useEffect, KeyboardEventHandler, createRef } from 'react';
import Text from '../../atoms/Text/Text';

export const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW: 40,
  ESC: 27,
  UP_ARROW: 38,
};

export interface SelectOption {
  label: string;
  value: string;
}

interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  label = 'Please select an option ...',
  onOptionSelected: handler,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const labelRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<React.RefObject<HTMLLIElement>>>([]);
  const [overlayTop, setOverlayTop] = useState(0);

  const getPreviousOptionIndex = (currentIndex: number | null) => {
    if (currentIndex === null) {
      return 0;
    }
    return currentIndex === 0 ? options.length - 1 : currentIndex - 1;
  };

  const getNextOptionIndex = (currentIndex: number | null) => {
    if (currentIndex === null) {
      return 0;
    }
    return currentIndex === options.length - 1 ? 0 : currentIndex + 1;
  };

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) {
      handler(option, optionIndex);
    }
    setSelectedIndex(optionIndex);
    setIsOpen(false);
  };

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();
    if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
      setIsOpen(true);
      highlightOption(0);
    }
  };

  const highlightOption = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    if (event.keyCode === KEY_CODES.ESC) {
      setIsOpen(false);
    } else if (event.keyCode === KEY_CODES.DOWN_ARROW) {
      highlightOption(getNextOptionIndex(highlightedIndex));
    } else if (event.keyCode === KEY_CODES.UP_ARROW) {
      highlightOption(getPreviousOptionIndex(highlightedIndex));
    } else if (event.keyCode === KEY_CODES.ENTER && highlightedIndex !== null) {
      onOptionSelected(options[highlightedIndex], highlightedIndex);
    }
  };

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  useEffect(() => {
    optionRefs.current = Array.from({ length: options.length }, () => createRef<HTMLLIElement>());
  }, [options.length]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs.current[highlightedIndex];
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  return (
    <div className='dp-select'>
      <button
        data-testid='DpSelectButton'
        onKeyDown={onButtonKeyDown}
        aria-controls='dp-select-list'
        aria-haspopup={true}
        aria-expanded={isOpen}
        ref={labelRef}
        className='dp-select__label'
        onClick={onLabelClick}>
        <Text>{selectedIndex ? options[selectedIndex]?.label : label}</Text>
        <svg
          className={`dp-select__caret ${
            isOpen ? 'dp-select__caret--open' : 'dp-select__caret--closed'
          }`}
          width='1rem'
          height='1rem'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path d='M19 9l-7 7-7-7' />
        </svg>
      </button>
      <ul
        role='menu'
        aria-hidden={!isOpen}
        id='dp-select-list'
        style={{ top: overlayTop }}
        className={`dp-select__overlay ${isOpen ? 'dp-select__overlay--open' : ''}`}>
        {options.map((option, optionIndex) => {
          const isSelected = selectedIndex === optionIndex;
          const isHighlighted = highlightedIndex === optionIndex;
          const ref = optionRefs.current[optionIndex];
          const renderOptionProps = {
            ref,
            option,
            isSelected,
            getOptionRecommendedProps: (overrideProps = {}) => ({
              ref,
              role: 'menuitemradio',
              'aria-label': option.label,
              'aria-checked': isSelected,
              onKeyDown: onOptionKeyDown,
              tabIndex: isHighlighted ? -1 : 0,
              onMouseEnter: () => highlightOption(optionIndex),
              onMouseLeave: () => highlightOption(null),
              className: `dp-select__option
                          ${isSelected ? 'dp-select__option--selected' : ''}
                          ${isHighlighted ? 'dp-select__option--highlighted' : ''}
                      `,
              key: option.value,
              onClick: () => onOptionSelected(option, optionIndex),
              ...overrideProps,
            }),
          };

          if (renderOption) {
            return renderOption(renderOptionProps);
          }

          return (
            <li {...renderOptionProps.getOptionRecommendedProps()}>
              <Text>{option.label}</Text>
              {isSelected && (
                <svg
                  width='1rem'
                  height='1rem'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path d='M5 13l4 4L19 7' />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
