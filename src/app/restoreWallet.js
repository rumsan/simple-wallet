/* global $ */
import { Modal } from '../utils';

export default class extends Modal {
  constructor(cfg) {
    super(cfg);
    this.registerEvents('seed-received');

    this.select('.btn-restore').on('click', () => { this.restore(); });
  }

  restore() {
    const mnemonic = this.select('[name=mnemonic]').val();
    // validations goes here
    this.fire('seed-received', mnemonic);
    this.close();
  }
}
