import store from 'store';
import web3 from './web3';
import CryptoUtil from '../utils/cryptoUtils';

export default class {
  constructor({ passcode }) {
    this.passcode = passcode;
  }

  create() {
    const mnemonic = EthWallet.bip39.generateMnemonic();
    this.createFromSeed({ mnemonic });
  }

  createFromSeed({ mnemonic }) {
    console.log(mnemonic);
    const seed = EthWallet.bip39.mnemonicToSeedSync(mnemonic);
    const hdwallet = EthWallet.hdkey.fromMasterSeed(seed);
    const walletHDpath = "m/44'/60'/0'/0/";
    const wallet = hdwallet.derivePath(walletHDpath + 0).getWallet();
    const address = `0x${wallet.getAddress().toString('hex')}`;
    const privateKey = wallet.getPrivateKey().toString('hex');

    web3.eth.accounts.wallet.add({ address, privateKey });
    web3.eth.accounts.wallet.save(this.passcode, 'wallet');
  }

  load() {
    const passcode = store.get('passcode');
    const accounts = web3.eth.accounts.wallet.load(passcode, 'wallet');
    return accounts[0];
  }

  clear() {}
}
