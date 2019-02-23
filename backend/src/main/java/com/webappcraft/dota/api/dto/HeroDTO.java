package com.webappcraft.dota.api.dto;

import com.webappcraft.dota.storage.entity.HeroEntity;
import com.webappcraft.dota.storage.entity.HeroRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HeroDTO {

    public Long id;
    public String name;
    public List<Integer> positions;

    public static HeroDTO from(HeroEntity entity) {
        return HeroDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .positions(entity.getRoleList().stream().map((it) -> it.position).collect(Collectors.toList()))
                .build();
    }

    public HeroEntity toEntity() {
        return HeroEntity.builder()
                .name(this.name)
                .roleList(positions.stream().map(HeroRole::fromPosition).collect(Collectors.toList()))
                .build();
    }

}
