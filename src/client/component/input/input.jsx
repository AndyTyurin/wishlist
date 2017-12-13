import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import noop from 'lodash/noop';

import { Theme, keys } from 'wl/util';

import styles from './input.scss';

@Theme(styles)
export class Input extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.oneOf(['text', 'tel', 'number', 'password', 'email']),
    disabled: PropTypes.bool,
    writable: PropTypes.bool,
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
    theme: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onEscape: PropTypes.func
  };

  static defaultProps = {
    value: '',
    placeholder: '',
    type: 'text',
    size: 'm',
    disabled: false,
    writable: true,
    onChange: noop,
    onEnter: noop,
    onEscape: noop
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    const { value: nextValue } = nextProps;

    if (value !== nextValue) {
      this.setState({
        value: nextValue
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { disabled, writable, placeholder } = this.props;

    return (
      this.state.value !== nextState.value ||
      disabled !== nextProps.disabled ||
      writable !== nextProps.writable ||
      placeholder !== nextProps.placeholder
    );
  }

  render() {
    const {
      theme, disabled, placeholder, type, size
    } = this.props;
    const { value } = this.state;

    return (
      <input
        className={theme('input', `size_${size}`)}
        onClick={this._handleClick}
        type={type}
        ref={(el) => {
          this.inputField = el;
        }}
        onChange={this.handleInputChange}
        onKeyUp={this.handleInputKeyUp}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  @autobind
  handleInputChange(e) {
    const { value } = e.target;

    this.setValue(value);
    this.props.onChange(value);
  }

  @autobind
  handleInputKeyUp(e) {
    const { keyCode } = e;
    const { onEnter, onEscape } = this.props;

    if (keyCode === keys.ENTER) {
      onEnter();
    } else if (keyCode === keys.ESCAPE) {
      onEscape();
    }
  }

  setValue(value) {
    const { writable } = this.props;

    if (writable) {
      this.setState({
        value
      });
    }
  }
}

export default Input;
