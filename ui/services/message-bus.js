
function e(name) {
    return `event:${name}`;
}

const eventBus = document.createComment("Event Bus");
document.body.appendChild(eventBus);
eventBus.send = (name, payload) => {
    const data = { detail: payload };
    const event = new CustomEvent(name, data);
    eventBus.dispatchEvent(event);
}

export const EVENT_BUS = eventBus;

export const EVENT = {
    GAME: {
        REGISTER: e("game:register"),
    },
    FILTER: {
        INPUT: e("filter:input"),
        CUT: e("filter:cut"),
        DELETE: e("filter:delete"),
    },
    KEY: {
        PRESS: e("key:press"),
    },
}

