import {EVENT_BUS, EVENT} from "./message-bus.js";

EVENT_BUS.addEventListener(EVENT.KEY.PRESS, checkHotkey);

function checkHotkey({ detail: key }) {
    if (key === "Escape") {
        EVENT_BUS.send(EVENT.FILTER.DELETE);
    } else if (key === "Backspace") {
        EVENT_BUS.send(EVENT.FILTER.CUT, key);
    } else if (key.match(/^[a-zA-Z ]$/)) {
        EVENT_BUS.send(EVENT.FILTER.INPUT, key);
    }
}
