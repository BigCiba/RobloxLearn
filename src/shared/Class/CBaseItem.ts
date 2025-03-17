import { CBaseAbility } from "./CBaseAbility";

export class CBaseItem extends CBaseAbility {
	OnEquip() {
		this.registerDeclareProperty();
	}
	OnUnequip() {
		this.unRegisterDeclareProperty();
	}
}