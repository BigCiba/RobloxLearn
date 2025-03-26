import { ABILITY_BEHAVIOR } from "shared/Enum";
import { ItemData } from "shared/GameData/Item";
import { AbilityKeyValue } from "types/Common";

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
	/** 获取物品的配置信息 */
	static GetItemData(itemName: string) {
		return this.Item[itemName];
	}
}