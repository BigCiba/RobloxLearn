import { AbilityKeyValue } from "types/Common";
import { ABILITY_BEHAVIOR } from "shared/Enum";
import { ItemData } from "shared/GameData/Item";

export class GameData {
	static Item: Record<string, AbilityKeyValue> = {};
	static ItemBase: AbilityKeyValue = {
		Behavior: ABILITY_BEHAVIOR.NONE,
		Texture: "",
		CastPoint: 0,
		Cooldown: 0,
		Values: {},
	};
	static Initialize() {
		for (const [abilityName, v] of pairs(ItemData)) {
			this.Item[abilityName] = { ...this.ItemBase, ...v };
		}
	}
}