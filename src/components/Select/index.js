import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import noop from '../../util/noop';
import { textDark, borderLight } from '../../constants/colors';

const Group = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  padding: 0.59375rem 1rem;

  border-top: 1px solid ${borderLight};
  border-bottom: 1px solid ${borderLight};

  color: ${textDark};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:first-of-type {
    border-left: 1px solid ${borderLight};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:last-of-type {
    border-right: 1px solid ${borderLight};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  ${({ checked, checkedClassName, activeClassName }) => css`
    ${checked &&
    `
        color: white;
        background: linear-gradient(
          247.07deg,
          rgba(47, 128, 237, 0.8) -61.36%,
          rgba(45, 156, 219, 0.8) 100%
        );
      `};

    ${checked && checkedClassName};

    &:active {
      background: linear-gradient(
        247.07deg,
        rgba(47, 128, 237, 0.6) -61.36%,
        rgba(45, 156, 219, 0.6) 100%
      );

      ${activeClassName};
    }
  `};
`;

const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  opacity: 0;
  position: absolute;

  margin: 0;
  padding: 0;
`;

const Option = ({
  label,
  value,
  name,
  onChange,
  checked,
  labelClassName,
  checkedClassName,
  activeClassName,
}) => (
  <Label
    className={labelClassName}
    checkedClassName={checkedClassName}
    activeClassName={activeClassName}
    checked={checked}
    htmlFor={`${name}-${value}`}
  >
    <Input
      type="checkbox"
      id={`${name}-${value}`}
      checked={checked}
      onChange={onChange}
    />
    {label}
  </Label>
);

export default class Select extends React.Component {
  static defaultProps = {
    onChange: noop,
  };

  onChange = (value) => () => {
    this.props.onChange(value);
  };

  render() {
    const {
      options,
      name,
      selected,
      className,
      labelClassName,
      checkedClassName,
      activeClassName,
    } = this.props;

    return (
      <Group className={className}>
        {options.map(({ label, value, onChange }) => (
          <Option
            onChange={this.onChange(value)}
            key={value}
            value={value}
            label={label}
            name={name}
            checked={selected === value}
            labelClassName={labelClassName}
            checkedClassName={checkedClassName}
            activeClassName={activeClassName}
          />
        ))}
      </Group>
    );
  }
}
