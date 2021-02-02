let token;
const HEADERS = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
});
const URL = "http://localhost:3000/api";
const AUTH_ENDPOINT = "auth/login";

const request = async (method, body, endpoint) => {
    const url = `${URL}/${endpoint}`;
    const parameters = {method, headers: HEADERS(), body}
    const response = await fetch(url, parameters);
    return response.json();
};

export const get = request.bind(undefined, "GET", undefined);

export const post = async (endpoint, body) => {
    return request("POST", JSON.stringify(body), endpoint);
}

export const login = async (user) => {
    const result = await post(AUTH_ENDPOINT, user);
    if (result.statusCode === 401) {
        throw new Error("Invalid login or password");
    } else {
        token = result.access_token;
    }
}
