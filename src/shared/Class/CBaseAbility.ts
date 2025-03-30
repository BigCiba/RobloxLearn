import { ABILITY_PROPERTY } from "shared/Enum";
import { GameData } from "shared/Module/GameData";
import { CBaseUnit } from "./CBaseUnit";
import { AbilityKeyValue } from "types/Common";

export class CBaseAbility {
	private __isRegister: boolean = false;

	private __caster: CBaseUnit;
	private __abilityName: string;
	protected __abilityData: AbilityKeyValue;
	constructor(caster: CBaseUnit, abilityName: string) {
		this.__caster = caster;
		this.__abilityName = abilityName;
		this.__abilityData = GameData.Item[abilityName];
		// this.registerDeclareProperty();
		this.OnCreated();
	}
	dispose() {
		// this.unRegisterDeclareProperty();
		this.OnDestroy();
	}
	protected registerDeclareProperty() {
		if (this.__isRegister) return;
		this.__isRegister = true;
		const declareProperty = this.DeclareProperty();
		for (const [key, value] of pairs(declareProperty)) {
			const oldValue = (this.__caster.GetHumanoid().GetAttribute("DeclareProperty" + key) ?? 0) as number;
			this.__caster.GetHumanoid().SetAttribute("DeclareProperty" + key, oldValue + value);
		}
	}
	protected unRegisterDeclareProperty() {
		if (!this.__isRegister) return;
		this.__isRegister = false;
		const declareProperty = this.DeclareProperty();
		for (const [key, value] of pairs(declareProperty)) {
			const oldValue = (this.__caster.GetHumanoid().GetAttribute("DeclareProperty" + key) ?? 0) as number;
			this.__caster.GetHumanoid().SetAttribute("DeclareProperty" + key, oldValue - value);
		}
	}
	OnCreated() { }
	OnDestroy() { }
	EndCooldown() {

	}
	GetAbilityTexture() {
		return this.__abilityData.Texture;
	}
	GetAbilityName() {
		return this.__abilityName;
	}
	GetBehavior() {
		return this.__abilityData.Behavior;
	}
	GetCastPoint() {
		return this.__abilityData.CastPoint;
	}
	GetCastRange(position: Vector3) {
		return 0;
	}
	GetCaster() {
		return this.__caster;
	}
	GetCooldown(level?: number) {
		return this.__abilityData.Cooldown;
	}
	GetCooldownRemaining() {
		return 0;
	}
	GetSpecialValueFor(name: string) {
		return this.__abilityData?.Values?.[name] ?? 0;
	}
	OnSpellStart() { }
	DeclareProperty(): Partial<Record<ABILITY_PROPERTY, number>> {
		return {};
	}
}