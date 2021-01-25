const HEADERS = {
    "Content-Type": "application/json",
};
const URL = "http://localhost:3000/api";

const request = async (method, body, endpoint) => {
    const url = `${URL}/${endpoint}`;
    const parameters = {method, headers: HEADERS, body}
    const response = await fetch(url, parameters);
    return response.json();
};

export const get = request.bind(undefined, "GET", undefined);

export const post = async (endpoint, body) => {
    return request("POST", JSON.stringify(body), endpoint);
}
