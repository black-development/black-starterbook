local QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent('black-starterbook:openBook')
AddEventHandler('black-starterbook:openBook', function(content, isEdit)
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = 'OPEN_BOOK',
        content = content,
        isEdit = isEdit,
        theme = Config.DefaultTheme,
        title = Config.Title,
        locales = Config.Locales[Config.Locale]
    })
end)

RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('saveContent', function(data, cb)
    SetNuiFocus(false, false)
    TriggerServerEvent('black-starterbook:saveContent', data.content)
    cb('ok')
end)



RegisterNetEvent('black-starterbook:client:setup')
AddEventHandler('black-starterbook:client:setup', function(content)
    TriggerEvent('black-starterbook:openBook', content, true)
end)
