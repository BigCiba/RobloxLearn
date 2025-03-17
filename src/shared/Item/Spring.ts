import { CBaseItem } from "shared/Class/CBaseItem";
import { ABILITY_PROPERTY } from "shared/Enum";

export class Spring extends CBaseItem {
	DeclareProperty(): Partial<Record<ABILITY_PROPERTY, number>> {
		return {
			[ABILITY_PROPERTY.JUMP_HEIGHT]: 20,
		};
	}
}