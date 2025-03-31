import { ServerStorage, Workspace, RunService } from "@rbxts/services";
import { CBaseItem } from "shared/Class/CBaseItem";
import { EventManager } from "shared/Module/EventManager";

export class ZhuZhu extends CBaseItem {
	OnSpellStart(): void {
		const caster = this.GetCaster();
		const count = this.GetSpecialValueFor("count");
		for (let i = 0; i < count; i++) {
			const pig = ServerStorage.WaitForChild("Model").WaitForChild("pig") as Model;
			const newZhuZhu = pig.Clone(); // 克隆一个猪猪
			newZhuZhu.Parent = Workspace;
			newZhuZhu.PivotTo(caster.GetPivot().mul(new CFrame(0, 0, -15)));
		}
	}
}