local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))

local CommonLua = {}

CommonLua.AddAbility = function(humanoid, abilityName)
	local ability = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Ability", abilityName)[abilityName]
	return ability.new(humanoid, abilityName)
end
CommonLua.AddItem = function(humanoid, abilityName)
	local ability = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Item", abilityName)[abilityName]
	return ability.new(humanoid, abilityName)
end

return CommonLua