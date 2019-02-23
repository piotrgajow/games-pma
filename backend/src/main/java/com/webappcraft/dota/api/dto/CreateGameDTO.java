package com.webappcraft.dota.api.dto;

import com.webappcraft.dota.domain.GameType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateGameDTO {

    private GameType type;

}
