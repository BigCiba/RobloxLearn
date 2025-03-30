import { ServerStorage, Workspace, RunService } from "@rbxts/services";
import { CBaseItem } from "shared/Class/CBaseItem";
import { ABILITY_PROPERTY } from "shared/Enum";

export class Dai extends CBaseItem {
	OnSpellStart(): void {
		print("急急急急急");
	}
	DeclareProperty(): Partial<Record<ABILITY_PROPERTY, number>> {
		return {
			[ABILITY_PROPERTY.MOVE_SPEED]: 40,
		};
	}
}