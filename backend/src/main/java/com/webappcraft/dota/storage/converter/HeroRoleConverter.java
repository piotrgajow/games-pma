package com.webappcraft.dota.storage.converter;

import com.webappcraft.dota.storage.entity.HeroRole;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class HeroRoleConverter implements AttributeConverter<HeroRole, Integer> {

    @Override
    public Integer convertToDatabaseColumn(HeroRole heroRole) {
        System.out.println("LOL1");
        return heroRole.position;
    }

    @Override
    public HeroRole convertToEntityAttribute(Integer integer) {
        System.out.println("LOL2");
        return HeroRole.fromPosition(integer);
    }

}
