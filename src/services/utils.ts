
function handleErrors(response: any) {
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response;
}

export { handleErrors };
