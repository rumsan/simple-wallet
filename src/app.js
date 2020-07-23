/* global $ */
import Info from './app/info';
import MenuBar from './app/menubar';
import SetupWallet from './app/setupWallet';

$(document).ready(() => {
  const setupWallet = new SetupWallet({ target: '#mdlPasscode' });
  const infoPanel = new Info({ target: '#cmpInfo' });
  const menuBar = new MenuBar({ target: '.footer-unlocked' });
  menuBar.render();
  infoPanel.render();

  $('#btnSetupWallet').on('click', () => {
    setupWallet.open();
  });

  setInterval(() => {
    infoPanel.refreshBalance();
  }, 5000);

  setTimeout(() => {
    $('#loader').fadeToggle(250);
  }, 500);
});
