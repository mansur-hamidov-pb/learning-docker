import { useState } from 'react';

export type IAsyncData<T> =
    {
        status: 'initial'
    } | {
        status: 'loading'
    } | {
        status: 'success',
        data: T
    } | {
        status: 'error',
        error: any;
    }


export function useAsyncData<T> (): [IAsyncData<T>, (service: () => Promise<T>) => Promise<T>] {
    const [asyncData, setAsyncData] = useState<IAsyncData<T>>({ status: 'initial'});

    function makeRequest (service: () => Promise<T>): Promise<T> {
        setAsyncData(() => ({ status: 'loading' }));

        return service()
                .then(({data}: any) => {
                    setAsyncData({
                        status: 'success',
                        data
                    });
                    return data;
                })
                .catch((error) => {
                    setAsyncData({
                        status: 'error',
                        error
                    });
                    throw error;
                });
    };

    return [asyncData, makeRequest]
}
