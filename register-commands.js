// Não rode esse comando dentro do pacote
// Use npm install discord.js pra instalar o modulo localmente e depois rode esse comando pra registrar os comando que existem dentro do pacote
// iremos criar uma forma melhor de fazer isso em breve


const {REST, Routes, SlashCommandBuilder} = require('discord.js')

const commands = [
    new SlashCommandBuilder().setName('test').setDescription('TESTE').toJSON()
]

const rest = new REST({ version: '10'}).setToken('pede ao adm')

rest.put(
    Routes.applicationCommands(''),
    {body: commands}
).then(() => console.log('Commands registered!'))

