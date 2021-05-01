import Vue from "../lib/vue.esm.browser.js";
import {EVENT, EVENT_BUS} from "../services/message-bus.js";
import {extendToken, getExpiration, getStatistics} from "../services/communication.js";

const template = `
<div>
    <p>Current MMR: {{current}}</p>
    <p>Peak MMR: {{peak}}</p>
    <p>Today MMR: <span :class="todayColor()">{{today}}</span></p>
    <a href="https://hearthstone.gamepedia.com/Battlegrounds" target="_blank">Wiki</a>
    <p>BentonNelvar#2166</p>
    <p @click="onSessionExtend" class="clickable">Session until: <span>{{expirationLabel}}</span></p>
</div>
`

function mounted() {
    loadStatistics.call(this);
    this.expirationDate = getExpiration();
    EVENT_BUS.addEventListener(EVENT.GAME.REGISTER, loadStatistics.bind(this));
    EVENT_BUS.addEventListener(EVENT.AUTH.TOKEN_EXTENDED, updateSession.bind(this));
}

async function loadStatistics() {
    const statistics = await getStatistics();
    this.current = statistics.currentMmr;
    this.peak = statistics.peakMmr;
    this.delta = statistics.mmrDeltaToday;
    this.played = statistics.gamesPlayedToday;
}

function updateSession({ detail: expiration }) {
    this.expirationDate = expiration;
}

async function onSessionExtend() {
    await extendToken();
}

function todayColor() {
    return {
        green: this.delta > 0,
        red: this.delta < 0,
    };
}

function today() {
    const sign = this.delta > 0 ? '+' : '';
    return `${sign}${this.delta} over ${this.played} games`;
}

function expirationLabel() {
    return `${this.expirationDate.getHours()}:${this.expirationDate.getMinutes()}`;
}

const data = () => ({current: 0, peak: 0, delta: 0, played: 0, expirationDate: new Date() });
const methods = {todayColor, onSessionExtend};
const computed = {today, expirationLabel};

Vue.component('pma-app-header', {template, data, computed, methods, mounted});
