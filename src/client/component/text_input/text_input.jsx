import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { Theme } from 'wl/util';

import Label from './../label/label';
import Input from './../input/input';
import Icon from './../icon/icon';

import styles from './text_input.scss';
import labelStyles from './label.scss';
import inputStyles from './input.scss';
import iconStyles from './icon.scss';

@Theme(styles, 'TextInput')
export class TextInput extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    iconName: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    theme: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onEscape: PropTypes.func
  };

  static defaultProps = {
    value: '',
    placeholder: '',
    label: '',
    iconName: '',
    disabled: false,
    onChange: noop,
    onEnter: noop,
    onEscape: noop
  };

  render() {
    const { theme } = this.props;

    return (
      <div className={theme('text-input')}>
        {this.renderInput()}
        {this.renderIcon()}
        {this.renderLabel()}
      </div>
    );
  }

  renderInput() {
    const {
      value,
      placeholder,
      onChange,
      disabled,
      onEnter,
      onEscape
    } = this.props;

    return (
      <Input
        styles={inputStyles}
        placeholder={placeholder}
        size="l"
        value={value}
        onChange={onChange}
        onEnter={onEnter}
        onEscape={onEscape}
        disabled={disabled}
      />
    );
  }

  renderLabel() {
    const { label } = this.props;
    return (
      <Label size="s" mode="hint" styles={labelStyles}>
        {label}
      </Label>
    );
  }

  renderIcon() {
    const { iconName } = this.props;
    return (iconName && <Icon name={iconName} styles={iconStyles} />) || false;
  }
}

export default TextInput;
