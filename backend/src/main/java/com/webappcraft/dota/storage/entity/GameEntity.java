package com.webappcraft.dota.storage.entity;

import com.webappcraft.dota.domain.HeroRole;
import com.webappcraft.dota.domain.game.GameResult;
import com.webappcraft.dota.domain.game.GameType;
import com.webappcraft.dota.storage.converter.HeroRoleConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "game")
public class GameEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private PlayerEntity player;

    @Column(name = "played_on")
    private LocalDateTime playedOn;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private GameType type;

    @Enumerated
    @Column(name = "result")
    private GameResult result;

    @ManyToOne
    @JoinColumn(name = "hero_id")
    private HeroEntity hero;

    @Convert(converter = HeroRoleConverter.class)
    @Column(name = "hero_role")
    private HeroRole heroRole;

    @Column(name = "player_rating")
    private Integer playerRating;

    @Column(name = "gosuai_rating")
    private Integer gosuaiRating;

}
