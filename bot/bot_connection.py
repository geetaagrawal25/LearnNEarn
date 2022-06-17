import discord
import config

from contract_interaction import send_token
from config import AMOUNT, RITU, CHANNEL_NAME,TOKEN

client = discord.Client()

#Getting a channel id and sending message on it
@client.event
async def on_ready():
    all_channels = client.get_channel(980471734182498335) #channel name
    await all_channels.send('Hello, the bot is woken up just now.. zzzhh ')


#Replying based on user's message

#every 5th time they would be rewarded.


@client.event
async def on_message(message):
    attention_list = ['blockchain','private keys','sha 256','solidity','web3']
    for i in message.content.split():
         if i in attention_list and str(message.channel) == CHANNEL_NAME:   #all_channels = client.get_channel(980471734182498335) #general channel 
            await message.channel.send('Levelled up') 
            txn = await send_token(RITU,AMOUNT)
            await message.reply(txn.hex(),mention_author = True)         
            await message.add_reaction('\U0001F525')
            
@client.event
async def on_reaction_add(reaction,user):
    if reaction.emoji == '\U0001F525':
        await reaction.message.channel.send(f'{user} has given a {reaction}') 
        
        
 
    

#client.run('OTgwMTE4OTEyMTI3NjA2ODM1.Grn-lN.WF0lkVubdMWm9mKasJQnaG14JUuJoNoTyea09g')
client.run(TOKEN)