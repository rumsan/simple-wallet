/* global $ */
import { Modal } from '../utils';

export default class extends Modal {
  constructor(cfg) {
    super(cfg);

    this.comp.on('shown.bs.modal', (e) => {
      this.load();
    });
  }

  processResult(address) {
    window.location.replace(`/transfer.html?to=${address}`);
    this.close();
  }

  async load() {
    const scanner = new Instascan.Scanner({ video: document.getElementById('camera') });
    scanner.on('scan', (qrData) => {
      this.processResult(qrData);
    });

    const devices = await Instascan.Camera.getBackCamera();
    this.camera = devices[0];
    scanner.camera = this.camera;
    scanner.start();
  }
}
