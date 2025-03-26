import { ABILITY_PROPERTY, INVENTORY_SLOT } from "shared/Enum";
import { AddAbility, AddItem } from "shared/Lua/CommonLua";
import { EventManager } from "shared/Module/EventManager";
import { CBaseAbility } from "./CBaseAbility";
import { CBaseItem } from "./CBaseItem";

export class CBaseUnit {
	private __humanoid: Humanoid;
	private __health: number = 1000;
	private __maxHealth: number = 1000;
	private __moveSpeed: number = 22;
	private __jumpHeight: number = 7.2;
	private __abilityList: Record<number, CBaseAbility> = {};
	private __inventoryList: Record<number, CBaseItem> = {};
	private AttributeChanged: RBXScriptConnection;
	constructor(humanoid: Humanoid) {
		this.__humanoid = humanoid;
		print("CBaseUnit constructor");
		this.AttributeChanged = this.__humanoid.AttributeChanged.Connect((attribute) => {
			if (attribute.find("DeclareProperty")) {
				const property = tonumber(attribute.sub(16)) as ABILITY_PROPERTY;
				if (property === ABILITY_PROPERTY.JUMP_HEIGHT) {
					this.__humanoid.JumpHeight = this.__jumpHeight + (this.__humanoid.GetAttribute(attribute) as number);
				} else if (property === ABILITY_PROPERTY.MOVE_SPEED) {
					this.__humanoid.WalkSpeed = this.__moveSpeed + (this.__humanoid.GetAttribute(attribute) as number);
				}
			}
		});
	}
	dispose() {
		this.AttributeChanged.Disconnect();
		for (const [k, v] of pairs(this.__inventoryList)) {
			v.dispose();
		}
		this.__inventoryList = {};
		print("CBaseUnit dispose");
	}
	AddAbility(abilityName: string) {
		const ability = AddAbility(this, abilityName);
		return ability;
	}
	AddItemByName(itemName: string) {
		let emptySlot;
		for (let slot = INVENTORY_SLOT.SLOT_1; slot < INVENTORY_SLOT.SLOT_0; slot++) {
			if (this.__inventoryList[slot] === undefined) {
				emptySlot = slot;
				break;
			}
		}
		if (emptySlot !== undefined) {
			const item = AddItem(this, itemName);
			this.__inventoryList[emptySlot] = item;
			EventManager.FireClient("OnInventoryChange", { slot: emptySlot, itemName: itemName });
			return item;
		}
	}
	GetHumanoid() {
		return this.__humanoid;
	}
	GetHealth() {
		return this.__health;
	}
	GetMaxHealth() {
		return this.__maxHealth;
	}
	GetMoveSpeed() {
		return this.__moveSpeed;
	}
	GetJumpHeight() {
		return this.__jumpHeight;
	}
	GetPosition() {
		return new Vector3(0, 0, 10);
	}
	GetItemInSlot(slot: INVENTORY_SLOT) {
		return this.__inventoryList[slot];
	}
	Kill() {
		this.__humanoid.Health = 0;
	}
	MoveToPosition() {

	}
}