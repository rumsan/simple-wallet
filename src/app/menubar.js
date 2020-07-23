/* global $ */
import { Component } from '../utils';
import Scanner from './scanner';

export default class extends Component {
  constructor(cfg) {
    super(cfg);
    this.scanner = new Scanner({ target: '#mdlQR' });
  }

  render() {
    $('#btnScanner').on('click', () => {
      this.scanner.open();
    });
  }
}
