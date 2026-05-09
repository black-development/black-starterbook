local QBCore = exports['qb-core']:GetCoreObject()

local bookContent = {}

local function loadBookData()
    local content = LoadResourceFile(GetCurrentResourceName(), "data/content.json")
    if not content or content == "" then
        bookContent = { { title = "WELCOME", text = "<h1>Welcome</h1><p>Edit this using /booksetup</p>" } }
    else
        bookContent = json.decode(content)
    end
end

loadBookData()

QBCore.Functions.CreateUseableItem(Config.ItemName, function(source, item)
    TriggerClientEvent('black-starterbook:openBook', source, bookContent, false)
end)

QBCore.Commands.Add("booksetup", "Edit Starter Book Content (" .. Config.AdminPermission .. ")", {}, false, function(source, args)
    TriggerClientEvent('black-starterbook:client:setup', source, bookContent)
end, Config.AdminPermission)

RegisterNetEvent('black-starterbook:saveContent')
AddEventHandler('black-starterbook:saveContent', function(content)
    local src = source
    if QBCore.Functions.HasPermission(src, Config.AdminPermission) then
        bookContent = content
        SaveResourceFile(GetCurrentResourceName(), "data/content.json", json.encode(content), -1)
    end
end)

AddEventHandler('QBCore:Server:PlayerLoaded', function(Player)
    if Config.GiveToNewPlayer then
        local src = Player.PlayerData.source
        local cid = Player.PlayerData.citizenid
        local isNew = MySQL.scalar.await('SELECT COUNT(*) FROM players WHERE citizenid = ?', {cid})
        if isNew == 1 then
            if Config.Inventory == "ox" then
                exports.ox_inventory:AddItem(src, Config.ItemName, Config.GiveAmount)
            else
                Player.Functions.AddItem(Config.ItemName, Config.GiveAmount)
                TriggerClientEvent('inventory:client:ItemBox', src, QBCore.Shared.Items[Config.ItemName], 'add')
            end
        end
    end
end)
