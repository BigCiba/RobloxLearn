import { AbilityKeyValue } from "shared/Declare/common";
import { ABILITY_PROPERTY } from "shared/Enum";
import { GameData } from "shared/Module/GameData";

export class CBaseAbility {
	private __caster: Humanoid;
	private __abilityName: string;
	private __abilityData: AbilityKeyValue;
	constructor(caster: Humanoid, abilityName: string) {
		this.__caster = caster;
		this.__abilityName = abilityName;
		this.__abilityData = GameData.Item[abilityName];
		const declareProperty = this.DeclareProperty();
		for (const [key, value] of pairs(declareProperty)) {
			const oldValue = (this.__caster.GetAttribute("DeclareProperty" + key) ?? 0) as number;
			this.__caster.SetAttribute("DeclareProperty" + key, oldValue + value);
		}
		this.OnCreated();
	}
	dispose() {
		const declareProperty = this.DeclareProperty();
		for (const [key, value] of pairs(declareProperty)) {
			const oldValue = (this.__caster.GetAttribute("DeclareProperty" + key) ?? 0) as number;
			this.__caster.SetAttribute("DeclareProperty" + key, oldValue - value);
		}
		this.OnDestroy();
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
		return this.__abilityData.Values[name];
	}
	OnSpellStart() { }
	DeclareProperty(): Partial<Record<ABILITY_PROPERTY, number>> {
		return {};
	}
}