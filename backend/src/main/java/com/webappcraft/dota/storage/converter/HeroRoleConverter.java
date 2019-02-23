package com.webappcraft.dota.storage.converter;

import com.webappcraft.dota.storage.entity.HeroRole;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class HeroRoleConverter implements AttributeConverter<HeroRole, Integer> {

    @Override
    public Integer convertToDatabaseColumn(HeroRole heroRole) {
        return heroRole.position;
    }

    @Override
    public HeroRole convertToEntityAttribute(Integer integer) {
        return HeroRole.fromPosition(integer);
    }

}
