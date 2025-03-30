import { ABILITY_BEHAVIOR } from "shared/Enum";

declare interface AbilityKeyValue {
	Behavior: ABILITY_BEHAVIOR;
	Texture: string;
	/** 绑定官方的Tool，需要预设在ServerStorage/Tool里面 */
	Tool?: string;
	CastPoint: number;
	Cooldown: number;
	Values: Record<string, number>;
}