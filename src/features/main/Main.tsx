import * as React from 'react';

import Header from '../common/Header';
import Projects from '../projects/Projects';

class MainComponent extends React.Component<{}, {}> {
    public constructor() {
        super();
    }

    public render() {
        return (
            <div>
                <Header />
                <Projects />
            </div>
        );
    }
};

export default MainComponent;
