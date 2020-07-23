/* global $ */
import store from 'store';
import { Modal } from '../utils';
import Wallet from '../blockchain/wallet';
import RestoreWallet from './restoreWallet';

export default class extends Modal {
  constructor(cfg) {
    super(cfg);

    this.restoreWallet = new RestoreWallet({ target: '#mdlWalletRestore' });

    this.select('.passcode').on('keyup', (e) => {
      const passcode = e.currentTarget.value;
      if (passcode.length === 6) {
        this.onPasscodeSet(e.currentTarget.value);
      } else {
        this.select('.modal-footer').hide();
      }
    });

    $('#btnNewWallet').on('click', () => {
      this.wallet = new Wallet({ passcode: this.passcode });
      this.wallet.create();
      window.location.reload();
    });

    $('#btnRestoreWallet').on('click', () => {
      this.close();
      this.restoreWallet.open();
    });

    this.restoreWallet.on('seed-received', (e, mnemonic) => {
      this.wallet = new Wallet({ passcode: this.passcode });
      this.wallet.createFromSeed({ mnemonic });
      // window.location.reload();
    });
  }

  onPasscodeSet(passcode) {
    this.passcode = passcode;
    store.set('passcode', passcode);
    this.select('.modal-footer').show();
  }
}
