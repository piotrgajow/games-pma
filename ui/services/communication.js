let token;
const HEADERS = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
});
const URL = "/api";
const AUTH_ENDPOINT = "auth/login";
const AUTH_EXTEND_ENDPOINT = "auth/extend";

const request = async (method, body, endpoint) => {
    const url = `${URL}/${endpoint}`;
    const parameters = {method, headers: HEADERS(), body}
    const response = await fetch(url, parameters);
    return response.json();
};

const get = async (endpoint) => {
    return request("GET", undefined, endpoint);
}

const post = async (endpoint, body) => {
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

export const extendToken = async () => {
    const result = await get(AUTH_EXTEND_ENDPOINT);
    if (result.statusCode === 200) {
        token = result.access_token;
    }
}

export const getHeroes = get.bind(undefined, "hero");
export const getHeroRanking = get.bind(undefined, "hero/ranking");
export const getCompositions = get.bind(undefined, "composition");
export const getStatistics = get.bind(undefined, "statistics");

export const registerGame = async (game) => {
    extendToken().then();
    return post("game", game);
}
