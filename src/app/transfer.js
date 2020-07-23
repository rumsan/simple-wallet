/* global $ */
import Swal from 'sweetalert2';
import { Component } from '../utils';
import Wallet from '../blockchain/wallet';
import web3 from '../blockchain/web3';

export default class extends Component {
  constructor(cfg) {
    super(cfg);
    this.wallet = new Wallet({});
  }

  async send() {
    const to = this.select('[name=sendToAddr').val();
    let value = this.select('[name=sendAmount').val();
    value = web3.utils.toWei(value, 'ether');

    const account = this.wallet.load();
    const signedTx = await account.signTransaction({ to, value, gas: 25000 });
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    swal.fire({
      title: 'Success',
      text: `You transferred ${value} ETH to ${to}`,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
        window.location.replace('index.html');
      }
    });
  }
}
