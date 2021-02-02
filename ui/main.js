import Vue from "./lib/vue.esm.browser.js";
import "./components/hero-ranking.js";
import "./components/game-result.js";
import {EVENT_BUS, EVENT} from "./services/message-bus.js";
import "./services/hotkey-service.js";
import "./components/app-header.js";
import "./components/login.form.js"

const template = `
<div>
    <div v-if="isLoggedIn">
        <pma-app-header class="app-header"></pma-app-header>
        <div class="app-wrapper">
            <pma-hero-ranking class="ranking"></pma-hero-ranking>
            <pma-game-result class="result-form"></pma-game-result>
        </div>
    </div>
    <pma-login-form v-else @logged-in="isLoggedIn = true"></pma-login-form>
</div>
`
const data = () => ({isLoggedIn: false});
Vue.component('pma-app', {template, data});

new Vue({el: '#app'});

document.body.addEventListener("keyup", (event) => {
    if (event.target.tagName !== "INPUT") {
        EVENT_BUS.send(EVENT.KEY.PRESS, event.key);
    }
});
document.body.addEventListener("keypress", (event) => {
    if (event.key === " ") {
        event.preventDefault();
    }
});

