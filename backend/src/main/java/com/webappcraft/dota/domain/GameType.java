package com.webappcraft.dota.domain;

public enum GameType {
    UNRANKED(false),
    SOLO_RANKED_PLACEMENT(false),
    SOLO_RANKED(true),
    PARTY_RANKED_PLACEMENT(false),
    PARTY_RANKED(true);

    private boolean isMmr;

    GameType(boolean isMmr) {
        this.isMmr = isMmr;
    }

    public boolean affectsMmr() {
        return isMmr;
    }

}
