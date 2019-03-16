import React from 'react';
import { StyleProvider } from 'native-base';
import { Provider } from 'mobx-react';

import stores from '../store';
import App from '../App';
import getTheme from '../theme/components';
import variables from '../theme/variables/commonColor';

export default class Setup extends React.Component {
  
    constructor () {
        super();
        this.state = {
            isLoading: false
        };
    }

    render () {
        return (
            <Provider {...stores}>
                <StyleProvider style={getTheme(variables)}>
                    <App />
                </StyleProvider>
            </Provider>
        );
    }
}
