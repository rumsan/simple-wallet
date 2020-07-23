import jquery from 'jquery';
import swal from 'sweetalert2';

import { hdkey } from 'ethereumjs-wallet';

window.jQuery = jquery;
window.$ = jquery;
window.swal = swal;
const bip39 = require('bip39');

window.EthWallet = { bip39, hdkey };
