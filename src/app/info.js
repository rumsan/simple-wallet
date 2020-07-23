/* global $ */
import QR from 'qrcode';
import store from 'store';
import { Component } from '../utils';
import web3 from '../blockchain/web3';

export default class extends Component {
  constructor(cfg) {
    super(cfg);
  }

  render() {
    const { wallet, address } = this.getWalletInfo();
    if (!wallet) {
      $('#cmpMain').hide();
      $('#cmpCreateWallet').show();
    }
    const canvas = $('#qrcode');
    const containerWidth = canvas.outerWidth();

    const options = {
      errorCorrectionLevel: 'H',
      type: 'svg',
      quality: 1,
      margin: 2,
      width: containerWidth,
      color: {
        dark: '#000000',
      },
    };

    this.select('.infoAddress').text(address);
    QR.toCanvas(document.getElementById('qrcode'), address, options);
    this.refreshBalance();
  }

  getWalletInfo() {
    const wallet = store.get('wallet');
    let address = null;
    if (wallet) address = `0x${wallet[0].address}`;
    return { wallet, address };
  }

  async refreshBalance() {
    const { wallet, address } = this.getWalletInfo();
    if (wallet) {
      let balance = await web3.eth.getBalance(address);
      balance = web3.utils.fromWei(balance, 'ether');
      this.select('.infoBalance').text(balance);
    }
  }
}
