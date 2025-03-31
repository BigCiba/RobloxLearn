import { ABILITY_PROPERTY, INVENTORY_SLOT } from "shared/Enum";
import { AddAbility, AddItem } from "shared/Lua/CommonLua";
import { EventManager } from "shared/Module/EventManager";
import { CBaseAbility } from "./CBaseAbility";
import { CBaseItem } from "./CBaseItem";

export class CBaseUnit {
	private __player: Player;
	private __humanoid: Humanoid;
	private __health: number = 1000;
	private __maxHealth: number = 1000;
	private __moveSpeed: number = 22;
	private __jumpHeight: number = 7.2;
	private __abilityList: Record<number, CBaseAbility> = {};
	private __inventoryList: Record<number, CBaseItem> = {};
	private AttributeChanged: RBXScriptConnection;
	constructor(player: Player, humanoid: Humanoid) {
		this.__player = player;
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
		EventManager.RegisterServerEvent("OnEquipStateChange", (player, data) => {
			if (player === this.__player) {
				for (const [k, v] of pairs(this.__inventoryList)) {
					v.Unequip();
				}
				this.__inventoryList[data.slot].Equip();
			}
		});
		EventManager.RegisterServerEvent("OnUseItem", (player, data) => {
			this.__inventoryList[data.slot].OnSpellStart();
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
			print("AddItemByName", itemName, emptySlot);
			EventManager.FireClient(this.__player, "OnInventoryChange", { slot: emptySlot, itemName: itemName });
			return item;
		}
	}
	GetHumanoid() {
		return this.__humanoid;
	}
	GetPlayer() {
		return this.__player;
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
		return this.__humanoid.RootPart?.Position ?? new Vector3(0, 0, 0);
	}
	GetOrientation() {
		return this.__humanoid.RootPart?.Orientation ?? new Vector3(0, 0, 0);
	}
	GetPivot() {
		return this.__humanoid.RootPart?.GetPivot() ?? new CFrame(0, 0, 0);
	}
	/** 平面2D向量 */
	GetForwardVector() {
		const Orientation = this.__humanoid.RootPart?.Orientation;
		if (Orientation === undefined) return new Vector3(0, 1, 0);
		// 提取绕 Y 轴的旋转角度
		const theta = Orientation.Y * (math.pi / 180); // 将角度转换为弧度
		// 计算方向单位向量
		const x = -math.sin(theta);
		const y = 0; // 绕 Y 轴旋转不会改变 Y 分量
		const z = -math.cos(theta);
		return new Vector3(x, y, z);
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