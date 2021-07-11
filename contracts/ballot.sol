// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Ballot {
  constructor(bytes32[] memory proposalNames) public {
      chairperson = msg.sender;
      voters[chairperson].weight = 1;

      for(uint i = 0; i < proposalNames.length; i++) {
          proposals.push(Proposal({
              name: proposalNames[i],
              voteCount: 0
          }));
      }
  }

  struct Voter {
      uint weight;
      bool voted;
      address delegate;
      uint vote;
  }

  struct Proposal {
      bytes32 name;
      uint voteCount;
  }

  address public chairperson;

  mapping(address => Voter) public voters;

  Proposal[] public proposals;

  function giveRightToVote(address voter) public {
      require(msg.sender == chairperson);
      require(!voters[voter].voted);
      require(voters[voter].weight == 0);
      voters[voter].weight = 1;
  }

  function delegate(address to) public {
      Voter storage sender = voters[msg.sender];
      require(!sender.voted);

      // Forward the delegation as long as
      // `to` also delegated.
      // In general, such loops are very dangerous,
      // because if they run too long, they might
      // need more gas than is available in a block.
      // In this case, the delegation will not be executed,
      // but in other situations, such loops might
      // cause a contract to get "stuck" completely.
      while(voters[to].delegate != address(0)) {
          to = voters[to].delegate;

          require(to != msg.sender);
      }

      sender.voted = true;
      sender.delegate = to;
      Voter storage delegate_ = voters[to];
      if (delegate_.voted) {
          proposals[delegate_.vote].voteCount += sender.weight;
      } else {
          delegate_.weight += sender.weight;
      }
  }

  function vote(uint proposal) public {
      Voter storage sender = voters[msg.sender];
      require(sender.weight != 0);
      require(!sender.voted);
      sender.voted = true;
      sender.vote = proposal;

      proposals[proposal].voteCount += sender.weight;
  }

  function winningProposal() public view returns (uint winningProposal_) {
      uint winningVoteCount = 0;
      for (uint p = 0; p < proposals.length; p++) {
          if (proposals[p].voteCount > winningVoteCount) {
              winningVoteCount = proposals[p].voteCount;
              winningProposal_ = p;
          }
      }
  }

  function winnerName() public view returns (bytes32 winnerName_) {
      winnerName_ = proposals[winningProposal()].name;
  }
}
