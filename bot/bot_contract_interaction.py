from web3 import Web3
from web3.middleware import geth_poa_middleware
from config import PRIVATE_KEY, PUBLIC_KEY, RITU
from config import INFURA_ENDPOINT_URL
web3 = Web3(Web3.HTTPProvider(INFURA_ENDPOINT_URL))

web3.middleware_onion.inject(geth_poa_middleware, layer=0)

contract_address = '0xD72683f758cA602736Ed1F6a6C7D0c1318394aDE'
contract_abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'

my_account = web3.eth.account.privateKeyToAccount(PRIVATE_KEY)

contract_instance = web3.eth.contract(address = contract_address, abi = contract_abi)

async def send_token(winner,amount):
    raw_txn = {
        'from':my_account.address,
        'gasPrice':web3.eth.gasPrice,
        'to': contract_address,
        'value':'0x0',
        'data':contract_instance.encodeABI('transfer',args=(winner,amount)),
        'nonce': web3.eth.getTransactionCount(my_account.address),
        'gas': 210000,

    }
    signed_txn=  web3.eth.account.signTransaction(raw_txn,PRIVATE_KEY)
    tx_hash =  web3.eth.sendRawTransaction(signed_txn.rawTransaction)
    return  tx_hash

# print(f"My balance: {contract_instance.functions.balanceOf(my_account.address).call()}")
# print(f"Receiver balance: {contract_instance.functions.balanceOf(ritu).call()}")
# print(f"My balance: {contract_instance.functions.balanceOf(my_account.address).call()}")
# print(f"Receiver balance: {contract_instance.functions.balanceOf(ritu).call()}")
#print(contract_instance.functions.name().call()) #Getting the name of the contract
#print(contract_instance.functions.symbol().call()) #Getting the symbol of the contract
#decimals = contract_instance.functions.decimals().call()
#print(contract_instance.functions.totalSupply().call()) #Getting total supply 

