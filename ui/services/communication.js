import {EVENT, EVENT_BUS} from "./message-bus.js";

let token;
const expirationTime = new Date();
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
    const result = await response.json();
    result._status = response.status;
    return result;
};

const get = async (endpoint) => {
    return request("GET", undefined, endpoint);
}

const post = async (endpoint, body) => {
    return request("POST", JSON.stringify(body), endpoint);
}

const handleToken = (jwt) => {
    token = jwt;
    const [_, payload] = jwt.split(".");
    const data = JSON.parse(window.atob(payload));
    expirationTime.setTime(data.exp * 1000);
    EVENT_BUS.send(EVENT.AUTH.TOKEN_EXTENDED, expirationTime);
}

export const getExpiration = () => expirationTime;

export const login = async (user) => {
    const result = await post(AUTH_ENDPOINT, user);
    if (result._status === 401) {
        throw new Error("Invalid login or password");
    } else {
        handleToken(result.access_token);
    }
}

export const extendToken = async () => {
    const result = await get(AUTH_EXTEND_ENDPOINT);
    if (result._status === 200) {
        handleToken(result.access_token);
    }
}

export const getHeroes = get.bind(undefined, "hero");
export const getHeroRanking = get.bind(undefined, "hero/ranking");
export const getCompositions = get.bind(undefined, "composition");
export const getStatistics = get.bind(undefined, "statistics");

export const registerGame = async (game) => {
    await extendToken();
    return post("game", game);
}
