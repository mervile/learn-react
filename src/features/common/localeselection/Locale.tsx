import * as React from 'react';
import { connect } from 'react-redux';
import { Translate, setLocale } from 'react-redux-i18n';

import { IStateTree } from '../../../models';

interface ILocaleProps {
    locale: string;
    selected: string;
    onSelect(locale: string): void;
}

class LocaleComponent extends React.Component<ILocaleProps, {}> {
    constructor() {
        super();

        this.select = this.select.bind(this);
    }

    public render() {
        const { locale, selected } = this.props;
        return (
            <span
                className={locale === selected ? 'locale selectedLocale' : 'locale'}
                onClick={this.select}
            >
                <Translate value={`common.${locale}`} />
            </span>
        );
    }

    private select() {
        this.props.onSelect(this.props.locale);
    }
}

interface ILocaleContainerProps {
    locale: string;
}

const mapStateToProps = (state: IStateTree, props: ILocaleContainerProps) => {
    return {
        locale: props.locale,
        selected: state.i18n.locale,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSelect: (locale: string) => {
            dispatch(setLocale(locale));
        },
    };
};

const Locale = connect(
    mapStateToProps,
    mapDispatchToProps
)(LocaleComponent);

export default Locale;
