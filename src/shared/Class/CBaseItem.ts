import { CBaseAbility } from "./CBaseAbility";

export class CBaseItem extends CBaseAbility {
	private __isEquip: boolean = false;
	Equip() {
		print("Equip", this.GetAbilityName());
		if (!this.__isEquip) {
			this.__isEquip = true;
			this.registerDeclareProperty();
		}
	}
	Unequip() {
		print("Unequip", this.GetAbilityName());
		if (this.__isEquip) {
			this.__isEquip = false;
			this.unRegisterDeclareProperty();
		}
	}
}