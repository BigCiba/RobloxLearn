import { ABILITY_PROPERTY } from "shared/Enum";
import { AddAbility, AddItem } from "shared/Lua/CommonLua";

export class CBaseUnit {
	private __humanoid: Humanoid;
	private __health: number = 1000;
	private __maxHealth: number = 1000;
	private __moveSpeed: number = 22;
	private __jumpHeight: number = 7.2;
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
		print("CBaseUnit dispose");
	}
	AddAbility(abilityName: string) {
		AddAbility(this.__humanoid, abilityName);
	}
	AddItemByName(itemName: string) {
		return AddItem(this.__humanoid, itemName);
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
	Kill() {
		this.__humanoid.Health = 0;
	}
	MoveToPosition() {

	}
}