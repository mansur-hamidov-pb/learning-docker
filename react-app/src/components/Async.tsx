import * as React from 'react';
import { IAsyncData } from '../hooks';

interface IProps<T> {
    branch: IAsyncData<T>;
    loadingRender: () => JSX.Element;
    successRender: (data: T) => JSX.Element;
    errorRender: (error: any) => JSX.Element;

}

export class Async<T> extends React.Component<IProps<T>>{
    render () {
        const {
            branch,
            loadingRender,
            successRender,
            errorRender
        } = this.props;

        let result: JSX.Element;
        if (branch.status === 'loading' || branch.status === 'initial') {
            result = loadingRender();
        } else if (branch.status === 'success') {
            result = successRender(branch.data)
        } else {
            result = errorRender(branch.error)
        }

        return (
            <>
                {result}
            </>
        )
    }
}