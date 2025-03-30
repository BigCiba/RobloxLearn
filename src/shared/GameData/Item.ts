import { AbilityKeyValue } from "types/Common";
import { ABILITY_BEHAVIOR } from "shared/Enum";

export const ItemData: Record<string, Partial<AbilityKeyValue>> = {
	Axe: {
		Behavior: ABILITY_BEHAVIOR.PASSIVE,
		CastPoint: 0.5,
		Cooldown: 1,
		Texture: "rbxassetid://11068929649",
		Tool: "axe",
	},
	Spring: {
		Behavior: ABILITY_BEHAVIOR.PASSIVE,
		Texture: "rbxassetid://12298739827",
		Tool: "Spring",
		Values: {
			jump_bonus: 20,
		},
	},
	ZhuZhu: {
		Behavior: ABILITY_BEHAVIOR.NO_TARGET,
		Cooldown: 1,
		Texture: "rbxassetid://133804548680200",
		Tool: "Zhu",
		Values: {
			count: 1,
		},
	},
	Dai: {
		Behavior: ABILITY_BEHAVIOR.NO_TARGET,
		Cooldown: 1,
		Texture: "rbxassetid://101899019689584",
		Tool: "Dai"
	},
};