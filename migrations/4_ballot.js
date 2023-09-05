const Ballot = artifacts.require("Ballot");

module.exports = function (deployer) {
  const names = process.env.PROPOSAL_NAMES;
  if (!names) {
    throw "You need to set PROPOSAL_NAMES";
  }
  const name_array = names.split(',').map(str => Buffer.from(str));

  deployer.deploy(Ballot, name_array);
};
