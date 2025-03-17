import { AbilityKeyValue } from "shared/Declare/common";
import { ABILITY_BEHAVIOR } from "shared/Enum";

export const ItemData:Record<string,Partial<AbilityKeyValue>> = {
	Axe: {
		Behavior: ABILITY_BEHAVIOR.PASSIVE,
		CastPoint: 0.5,
		Cooldown: 1,
		Texture: "rbxassetid://11068929649",
	},
	Spring: {
		Behavior: ABILITY_BEHAVIOR.PASSIVE,
		Texture: "rbxassetid://12298739827",
		Values: {
			jump_bonus: 20,
		},
	},
	ZhuZhu: {
		Behavior: ABILITY_BEHAVIOR.NO_TARGET,
		Cooldown: 1,
		Texture: "rbxassetid://133804548680200",
		Values: {
			count: 1,
		},
	},
}