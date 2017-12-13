export function Listeners(listeners) {
  return WrapperComponent =>
    class extends WrapperComponent {
      constructor(props) {
        super(props);

        this.listenersEvents = Object.keys(listeners);
      }

      componentDidMount() {
        const { componentDidMount } = Object.getPrototypeOf(this);

        if (componentDidMount) {
          componentDidMount();
        }

        this.listenersEvents.forEach((event) => {
          const [handler, options = {}, useCapture = false] =
            typeof this.listenersEvents[event] === 'function'
              ? [this.listenersEvents[event]]
              : this.listenersEvents[event];
          window.addEventListener(event, handler, options, useCapture);
        });
      }

      componentWillUnmount() {
        const { componentWillUnmount } = Object.getPrototypeOf(this);

        if (componentWillUnmount) {
          componentWillUnmount();
        }

        this.listenersEvents.forEach((event) => {
          const [handler] =
            typeof this.listenersEvents[event] === 'function'
              ? [this.listenersEvents[event]]
              : this.listenersEvents[event];
          window.removeEventListener(event, handler);
        });
      }
    };
}

export default Listeners;
