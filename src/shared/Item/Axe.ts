import { ServerStorage, Workspace } from "@rbxts/services";
import { CBaseItem } from "shared/Class/CBaseItem";

export class Axe extends CBaseItem {
	OnSpellStart(): void {
		// 找到圆范围内的Model
		const models = Workspace.GetChildren();
		for (const [i, v] of ipairs(models)) {
			if (v.IsA("Model") && v.Name === "pig") {
				const pivot = this.GetCaster().GetPivot().mul(new CFrame(0, 0, -5));
				const distance = (v.GetPivot().Position.sub(pivot.Position)).Magnitude;
				if (distance < 12) {
					const porkPivot = v.WorldPivot;
					v.Destroy();
					const pork = ServerStorage.WaitForChild("Model").WaitForChild("pork") as Model;
					const newZhuZhu = pork.Clone(); // 克隆一个猪猪
					newZhuZhu.Parent = Workspace;
					newZhuZhu.PivotTo(porkPivot);
				}
			}
		}
	}
}