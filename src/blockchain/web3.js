/* global Web3 */
import config from '../../build.json';

const web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain_network));

export default web3;
