const SimpleAuction = artifacts.require("./SimpleAuction.sol");

module.exports = function (deployer) {
  const beneficiary = process.env.BENEFICIARY;
  const biddingTime = process.env.BIDDING_TIME;
  if (!beneficiary || !biddingTime) {
    throw "You need to set BENEFICIARY and BIDDING_TIME";
  }
  deployer.deploy(SimpleAuction, biddingTime, beneficiary);
};
