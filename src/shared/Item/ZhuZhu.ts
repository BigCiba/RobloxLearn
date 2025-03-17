import { Workspace } from "@rbxts/services";
import { CBaseItem } from "shared/Class/CBaseItem";

export class ZhuZhu extends CBaseItem {
	OnSpellStart(): void {
		const count = this.GetSpecialValueFor("count");
		for (let i = 0; i < count; i++) {
			const ZhuZhu = Workspace.WaitForChild("ZhuZhu") as Model;
			const newZhuZhu = ZhuZhu.Clone(); // 克隆一个猪猪
			newZhuZhu.Parent = game.Workspace;
			newZhuZhu.MoveTo(ZhuZhu.GetPivot().Position);
		}
	}
}