import { ServerStorage, Workspace } from "@rbxts/services";
import { CBaseItem } from "shared/Class/CBaseItem";

export class ZhuZhu extends CBaseItem {
	OnSpellStart(): void {
		const caster = this.GetCaster();
		const count = this.GetSpecialValueFor("count");
		for (let i = 0; i < count; i++) {
			const pig = ServerStorage.WaitForChild("Model").WaitForChild("Pig") as MeshPart;
			const newZhuZhu = pig.Clone(); // 克隆一个猪猪
			newZhuZhu.Parent = Workspace;
			newZhuZhu.Position = caster.GetPosition();
		}
	}
}