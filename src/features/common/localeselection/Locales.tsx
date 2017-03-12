import * as React from 'react';

import Locale from './Locale';

class Locales extends React.Component<{}, {}> {
    constructor() {
        super();
    }

    public render() {
        const locales = ['en', 'fi'];
        const options = locales.map(l =>
            <Locale key={l} locale={l} />
        );
        return (
            <div className='selectLocale'>
                {options}
            </div>
        );
    }
}

export default Locales;
