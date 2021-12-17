const baseUrl = 'http://localhost:7000/api/users';

export async function postFetch(url, dataToSend) {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await resp.json();
        return data;
    } catch (error) {
        console.log('catch block error', error);
    }
}

export async function getFetchData() {
    try {
        const resp = await fetch(`${baseUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await resp.json();
        // console.log('data ===', data);
        return data;
    } catch (error) {
        console.log('getFetchData catch block error', error);
    }
}
