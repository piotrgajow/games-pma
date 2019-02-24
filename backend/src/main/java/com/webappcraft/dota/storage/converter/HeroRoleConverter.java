package com.webappcraft.dota.storage.converter;

import com.webappcraft.dota.domain.HeroRole;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class HeroRoleConverter implements AttributeConverter<HeroRole, Integer> {

    @Override
    public Integer convertToDatabaseColumn(HeroRole heroRole) {
        return heroRole != null ? heroRole.position : null;
    }

    @Override
    public HeroRole convertToEntityAttribute(Integer integer) {
        return HeroRole.fromPosition(integer);
    }

}
