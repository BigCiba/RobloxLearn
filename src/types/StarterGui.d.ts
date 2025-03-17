interface StarterGui extends Instance {
	ScreenGui: ScreenGui & {
		Inventory: Frame & {
			PrefabSlot: ImageButton & {
				HotKey: TextLabel;
				UIStroke: UIStroke;
			};
		};
	};
}