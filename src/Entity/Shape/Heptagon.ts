/*
    DiepCustom - custom tank game server that shares diep.io's WebSocket protocol
    Copyright (C) 2022 ABCxFF (github.com/ABCxFF)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>
*/

import GameServer from "../../Game";
import AbstractShape from "./AbstractShape";

import { Color, NameFlags } from "../../Const/Enums";

/**
 * Hexagon entity class.
 */
export default class Heptagon extends AbstractShape {
    /** If the Hexagon is an alpha Hexagon or not */
    public isAlpha: boolean;

    protected static BASE_ROTATION = AbstractShape.BASE_ROTATION / 2;
    protected static BASE_ORBIT = AbstractShape.BASE_ORBIT / 2;
    protected static BASE_VELOCITY = AbstractShape.BASE_VELOCITY / 2;

    public constructor(game: GameServer, isAlpha=false, alpha=(Math.random() < 0.035), shiny=(Math.random() < 0.01) && !isAlpha) {

        if (alpha) {
          //isAlpha = true;
        }
        
        super(game);
        
        this.nameData.values.name = isAlpha ? "Alpha Heptagon" : "Heptagon";

        this.healthData.values.health = this.healthData.values.maxHealth = (isAlpha ? 15000 : 2200);
        this.physicsData.values.size = (isAlpha ? 200 : 110) * Math.SQRT1_2;
        this.physicsData.values.sides = 7;
        this.styleData.values.color = shiny ? Color.Shiny : Color.EnemyHeptagon;

        this.physicsData.values.absorbtionFactor = isAlpha ? 0.03 : 0.05;
        this.physicsData.values.pushFactor = 11;

        this.isAlpha = isAlpha;
        this.isShiny = shiny;

        this.damagePerTick = isAlpha ? 25 : 18;
        this.scoreReward = isAlpha ? 15000 : 2400;
        if (isAlpha) // Show name UI for alpha pentagons
		    this.nameData.values.flags ^= NameFlags.hiddenName;
        if (shiny) {
            this.scoreReward *= 100;
            this.healthData.values.health = this.healthData.values.maxHealth *= 1;
        }
    }
}
