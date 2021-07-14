const SimplePaymentChannel = artifacts.require("./SimplePaymentChannel.sol");

module.exports = function (deployer) {
  const recipient = process.env.RECIPIENT_ADDRESS;
  const duration = process.env.DURATION;
  if (!recipient || !duration) {
    throw "You need to set RECIPIENT_ADDRESS and DURATION";
  }
  deployer.deploy(SimplePaymentChannel, recipient, parseInt(duration));
};
