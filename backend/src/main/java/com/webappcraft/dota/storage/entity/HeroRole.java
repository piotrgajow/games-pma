package com.webappcraft.dota.storage.entity;

import java.util.HashMap;
import java.util.Map;

public enum HeroRole {
    CARRY(1),
    MID(2),
    OFFLANE(3),
    SUPPORT(4),
    HARD_SUPPORT(5);

    private static final Map<Integer, HeroRole> LOOKUP = new HashMap<>();

    static {
        for (HeroRole role : HeroRole.values()) {
            LOOKUP.put(role.position, role);
        }
    }

    public Integer position;

    HeroRole(Integer position) {
        this.position = position;
    }

    public static HeroRole fromPosition(Integer position) {
        return LOOKUP.get(position);
    }

}
