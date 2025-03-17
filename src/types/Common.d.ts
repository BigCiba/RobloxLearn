import { ABILITY_BEHAVIOR } from "shared/Enum";

declare interface AbilityKeyValue {
	Behavior: ABILITY_BEHAVIOR;
	Texture: string;
	CastPoint: number;
	Cooldown: number;
	Values: Record<string, number>;
}
