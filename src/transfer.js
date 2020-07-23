/* global $ */
import TransferComp from './app/transfer';

$(document).ready(() => {
  const transfer = new TransferComp({ target: '#cmpTransfer' });

  $('#btnSend').on('click', () => {
    transfer.send();
  });

  setTimeout(() => {
    $('#loader').fadeToggle(250);
  }, 500);
});
