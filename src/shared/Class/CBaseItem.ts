import { ServerStorage } from "@rbxts/services";
import { CBaseAbility } from "./CBaseAbility";
import { CBaseUnit } from "./CBaseUnit";

export class CBaseItem extends CBaseAbility {
	private __isEquip: boolean = false;
	private __tool: Tool | undefined;
	constructor(caster: CBaseUnit, abilityName: string) {
		super(caster, abilityName);
		if (this.__abilityData.Tool !== undefined) {
			const tool = ServerStorage.WaitForChild("Tool").WaitForChild(this.__abilityData.Tool) as Tool;
			if (tool !== undefined) {
				this.__tool = tool.Clone();
			}
		}
	}
	dispose(): void {
		super.dispose();
		if (this.__tool !== undefined) {
			this.__tool.Destroy();
		}
	}
	Equip() {
		if (!this.__isEquip) {
			print("Equip", this.GetAbilityName());
			this.__isEquip = true;
			this.registerDeclareProperty();
			if (this.__tool !== undefined) {
				this.__tool.Parent = this.GetCaster().GetHumanoid().Parent;
			}
		}
	}
	Unequip() {
		if (this.__isEquip) {
			print("Unequip", this.GetAbilityName());
			this.__isEquip = false;
			this.unRegisterDeclareProperty();
			if (this.__tool !== undefined) {
				this.__tool.Parent = undefined;
			}
		}
	}
	GetToolName() {
		return this.__abilityData.Tool;
	}
}