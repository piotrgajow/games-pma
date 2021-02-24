import Vue from "../lib/vue.esm.browser.js";
import {login} from "../services/communication.js";

const template = `
<div>
    <label for="login">Login:</label>
    <input ref="login" v-model="login"/>
    <label for="password">Password:</label>
    <input type="password" v-model="password"/>
    <button @click="onLogin">Login</button>
</div>
`

function mounted() {
    this.$refs.login.focus();
}

async function onLogin() {
    const user = {login: this.login, password: this.password};
    try {
        await login(user);
        this.$emit("logged-in");
    } catch (e) {
        window.alert(e);
    }
}

const data = () => ({login: "", password: ""});
const methods = { onLogin };

Vue.component('pma-login-form', {template, mounted, data, methods});
