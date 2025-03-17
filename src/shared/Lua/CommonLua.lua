local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))

local CommonLua = {}

CommonLua.AddAbility = function(unit, abilityName)
	local ability = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Ability", abilityName)[abilityName]
	return ability.new(unit, abilityName)
end
CommonLua.AddItem = function(unit, abilityName)
	local ability = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Item", abilityName)[abilityName]
	return ability.new(unit, abilityName)
end

return CommonLua