import PropTypes from 'prop-types';
import React from 'react';

import { isValidAmplitudeInstance } from '../lib/validation';

class AmplitudeProvider extends React.Component {
  componentWillMount() {
    const { props } = this;

    if (isValidAmplitudeInstance(props.amplitudeInstance)) {
      if (props.apiKey) {
        props.amplitudeInstance.init(props.apiKey, null, props.config, props.callback);
      }

      if (props.userId) {
        props.amplitudeInstance.setUserId(props.userId);
      }
    } else {
      console.error('AmplitudeProvider was not provided with a valid "amplitudeInstance" prop.');
    }
  }

  getChildContext() {
    const { context, props } = this;

    return {
      getAmplitudeInstance(instanceName = '$default_instance') {
        if (props.amplitudeInstance._instanceName === instanceName) {
          return props.amplitudeInstance;
        } else if (context.getAmplitudeInstance) {
          return context.getAmplitudeInstance(instanceName);
        } else {
          return null;
        }
      },
      getAmplitudeEventProperties() {
        return props.eventProperties || {};
      },
    };
  }

  render() {
    const { props } = this;

    return props.children;
  }
}

AmplitudeProvider.propTypes = {
  amplitudeInstance: PropTypes.object.isRequired,
  apiKey: PropTypes.string,
  userId: PropTypes.string,
  config: PropTypes.object,
  callback: PropTypes.func,
};

AmplitudeProvider.contextTypes = {
  getAmplitudeInstance: PropTypes.func,
};

AmplitudeProvider.childContextTypes = {
  getAmplitudeInstance: PropTypes.func,
  getAmplitudeEventProperties: PropTypes.func,
};

export default AmplitudeProvider;
