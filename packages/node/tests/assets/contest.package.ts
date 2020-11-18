const abi = {
  "ABI version": 2,
  header: ["pubkey", "time"],
  functions: [
    {
      name: "constructor",
      inputs: [
        { name: "title", type: "bytes" },
        { name: "link", type: "bytes" },
        { name: "hash", type: "uint256" },
        { name: "juryAddr", type: "address" },
        { name: "juryKeys", type: "uint256[]" },
      ],
      outputs: [],
    },
    {
      name: "setupContest",
      inputs: [
        { name: "startsIn", type: "uint16" },
        { name: "lastsFor", type: "uint16" },
      ],
      outputs: [],
    },
    {
      name: "setupJurors",
      inputs: [{ name: "jurors", type: "address[]" }],
      outputs: [],
    },
    {
      name: "rejectApplicant",
      inputs: [],
      outputs: [],
    },
    {
      name: "submitWithContact",
      inputs: [
        { name: "participant", type: "address" },
        { name: "forumLink", type: "bytes" },
        { name: "fileLink", type: "bytes" },
        { name: "hash", type: "uint256" },
        { name: "contact", type: "address" },
      ],
      outputs: [],
    },
    {
      name: "submit",
      inputs: [
        { name: "participant", type: "address" },
        { name: "forumLink", type: "bytes" },
        { name: "fileLink", type: "bytes" },
        { name: "hash", type: "uint256" },
      ],
      outputs: [],
    },
    {
      name: "openContest",
      inputs: [],
      outputs: [],
    },
    {
      name: "closeContest",
      inputs: [],
      outputs: [],
    },
    {
      name: "openVoting",
      inputs: [],
      outputs: [],
    },
    {
      name: "closeVoting",
      inputs: [],
      outputs: [],
    },
    {
      name: "rejectVote",
      inputs: [],
      outputs: [],
    },
    {
      name: "voteFor",
      inputs: [
        { name: "id", type: "uint16" },
        { name: "mark", type: "uint32" },
      ],
      outputs: [],
    },
    {
      name: "voteForCommented",
      inputs: [
        { name: "id", type: "uint16" },
        { name: "mark", type: "uint32" },
        { name: "comment", type: "bytes" },
      ],
      outputs: [],
    },
    {
      name: "abstain",
      inputs: [
        { name: "id", type: "uint16" },
        { name: "comment", type: "bytes" },
      ],
      outputs: [],
    },
    {
      name: "voteAgainst",
      inputs: [
        { name: "id", type: "uint16" },
        { name: "comment", type: "bytes" },
      ],
      outputs: [],
    },
    {
      name: "finalizeResults",
      inputs: [],
      outputs: [],
    },
    {
      name: "votingEndsIn",
      inputs: [],
      outputs: [{ name: "daysLeft", type: "uint64" }],
    },
    {
      name: "contestStartCountdown",
      inputs: [],
      outputs: [{ name: "secondsLeft", type: "int64" }],
    },
    {
      name: "contestCountdown",
      inputs: [],
      outputs: [{ name: "secondsLeft", type: "int64" }],
    },
    {
      name: "votingCountdown",
      inputs: [],
      outputs: [{ name: "secondsLeft", type: "int64" }],
    },
    {
      name: "getId",
      inputs: [{ name: "addr", type: "address" }],
      outputs: [{ name: "value0", type: "uint16" }],
    },
    {
      name: "listContenders",
      inputs: [],
      outputs: [
        { name: "ids", type: "uint16[]" },
        { name: "addresses", type: "address[]" },
      ],
    },
    {
      name: "getStatsFor",
      inputs: [{ name: "id", type: "uint16" }],
      outputs: [
        { name: "totalPoints", type: "uint64" },
        { name: "avgHi", type: "uint32" },
        { name: "avgLo", type: "uint32" },
        { name: "jurorsVoted", type: "uint16" },
        { name: "accepted", type: "uint16" },
        { name: "abstained", type: "uint16" },
        { name: "rejected", type: "uint16" },
      ],
    },
    {
      name: "getVotesPerJuror",
      inputs: [{ name: "id", type: "uint16" }],
      outputs: [
        { name: "jurorsFor", type: "address[]" },
        { name: "marks", type: "uint32[]" },
        { name: "commentsFor", type: "bytes[]" },
        { name: "jurorsAbstained", type: "address[]" },
        { name: "commentsAbstained", type: "bytes[]" },
        { name: "jurorsAgainst", type: "address[]" },
        { name: "commentsAgainst", type: "bytes[]" },
      ],
    },
    {
      name: "getContestStats",
      inputs: [],
      outputs: [
        { name: "totalScore", type: "uint64" },
        { name: "avgHi", type: "uint32" },
        { name: "avgLo", type: "uint32" },
        { name: "jurorsVoted", type: "uint16" },
        { name: "entries", type: "uint16" },
      ],
    },
    {
      name: "getContestInfo",
      inputs: [],
      outputs: [
        { name: "title", type: "bytes" },
        { name: "link", type: "bytes" },
        { name: "hash", type: "uint256" },
        { name: "juryAddr", type: "address" },
        { name: "juryKeys", type: "uint256[]" },
        { name: "juryAddresses", type: "address[]" },
        { name: "maxVotingAttempts", type: "uint8" },
      ],
    },
    {
      name: "getContestProgress",
      inputs: [],
      outputs: [
        { name: "votesCount", type: "uint64" },
        { name: "contendersCount", type: "uint16" },
        { name: "contestOpen", type: "bool" },
        { name: "votingOpen", type: "bool" },
        { name: "contestDeadline", type: "uint64" },
        { name: "votingDeadline", type: "uint64" },
        { name: "resultsFinalized", type: "bool" },
      ],
    },
    {
      name: "getInfoFor",
      inputs: [{ name: "id", type: "uint16" }],
      outputs: [
        { name: "addr", type: "address" },
        { name: "forumLink", type: "bytes" },
        { name: "fileLink", type: "bytes" },
        { name: "hash", type: "uint256" },
        { name: "appliedAt", type: "uint64" },
        { name: "contact", type: "address" },
      ],
    },
    {
      name: "getContendersInfo",
      inputs: [],
      outputs: [
        { name: "ids", type: "uint16[]" },
        { name: "addrs", type: "address[]" },
        { name: "forumLinks", type: "bytes[]" },
        { name: "fileLinks", type: "bytes[]" },
        { name: "hashes", type: "uint256[]" },
        { name: "appliedAts", type: "uint64[]" },
        { name: "contacts", type: "address[]" },
      ],
    },
    {
      name: "getVotes",
      inputs: [],
      outputs: [{ name: "votes", type: "uint64" }],
    },
    {
      name: "getVotesFor",
      inputs: [{ name: "id", type: "uint16" }],
      outputs: [{ name: "votes", type: "uint16" }],
    },
    {
      name: "getTotalRatingFor",
      inputs: [{ name: "id", type: "uint16" }],
      outputs: [{ name: "rating", type: "uint64" }],
    },
    {
      name: "resultsFinalized",
      inputs: [],
      outputs: [{ name: "flag", type: "bool" }],
    },
    {
      name: "getFinalStatusFor",
      inputs: [{ name: "id", type: "uint16" }],
      outputs: [{ name: "status", type: "bool" }],
    },
    {
      name: "getFinalStatus",
      inputs: [],
      outputs: [{ name: "status", type: "bool[]" }],
    },
    {
      name: "getFinalContestStats",
      inputs: [],
      outputs: [
        { name: "totalScore", type: "uint64" },
        { name: "avgHi", type: "uint32" },
        { name: "avgLo", type: "uint32" },
        { name: "jurorsVoted", type: "uint16" },
        { name: "entries", type: "uint16" },
        { name: "passed", type: "uint16" },
        { name: "rejected", type: "uint16" },
      ],
    },
    {
      name: "getFinalStatsFor",
      inputs: [{ name: "id", type: "uint16" }],
      outputs: [
        { name: "status", type: "bool" },
        { name: "totalPoints", type: "uint64" },
        { name: "avgHi", type: "uint32" },
        { name: "avgLo", type: "uint32" },
        { name: "jurorsVoted", type: "uint16" },
        { name: "accepted", type: "uint16" },
        { name: "abstained", type: "uint16" },
        { name: "rejected", type: "uint16" },
      ],
    },
    {
      name: "getFinalVotingData",
      inputs: [],
      outputs: [
        { name: "ids", type: "uint16[]" },
        { name: "juryAddresses", type: "address[]" },
        { name: "statuses", type: "bool[]" },
        { name: "totalRatings", type: "uint64[]" },
        { name: "jurorsVoted", type: "uint16[]" },
        { name: "votesFor", type: "uint16[]" },
        { name: "votesAbstained", type: "uint16[]" },
        { name: "votesAgainst", type: "uint16[]" },
      ],
    },
    {
      name: "transfer",
      inputs: [
        { name: "dest", type: "address" },
        { name: "value", type: "uint64" },
        { name: "bounce", type: "bool" },
        { name: "flags", type: "uint16" },
      ],
      outputs: [],
    },
    {
      name: "forceContest",
      inputs: [{ name: "flag", type: "bool" }],
      outputs: [],
    },
    {
      name: "forceVoting",
      inputs: [{ name: "flag", type: "bool" }],
      outputs: [],
    },
    {
      name: "forceFinalize",
      inputs: [{ name: "flag", type: "bool" }],
      outputs: [],
    },
    {
      name: "setContestDeadline",
      inputs: [{ name: "time", type: "uint64" }],
      outputs: [],
    },
    {
      name: "setVotingDeadline",
      inputs: [{ name: "time", type: "uint64" }],
      outputs: [],
    },
    {
      name: "setPeer",
      inputs: [{ name: "addr", type: "address" }],
      outputs: [],
    },
    {
      name: "exportData",
      inputs: [],
      outputs: [],
    },
    {
      name: "importData",
      inputs: [
        { name: "title", type: "bytes" },
        { name: "link", type: "bytes" },
        { name: "hash", type: "uint256" },
        { name: "juryAddr", type: "address" },
        { name: "juryKeys", type: "uint256[]" },
      ],
      outputs: [],
    },
    {
      name: "exportJurors",
      inputs: [],
      outputs: [],
    },
    {
      name: "importJurors",
      inputs: [{ name: "jurorAddresses", type: "address[]" }],
      outputs: [],
    },
    {
      name: "exportSetup",
      inputs: [],
      outputs: [],
    },
    {
      name: "importSetup",
      inputs: [
        { name: "contestOpens", type: "uint64" },
        { name: "contestDeadline", type: "uint64" },
        { name: "contestOpen", type: "bool" },
        { name: "votingOpen", type: "bool" },
        { name: "areResultsFinalized", type: "bool" },
      ],
      outputs: [],
    },
    {
      name: "exportContenders",
      inputs: [],
      outputs: [],
    },
    {
      name: "importContender",
      inputs: [
        {
          components: [
            { name: "addr", type: "address" },
            { name: "forumLink", type: "bytes" },
            { name: "fileLink", type: "bytes" },
            { name: "hash", type: "uint256" },
            { name: "appliedAt", type: "uint64" },
            { name: "contact", type: "address" },
          ],
          name: "contender",
          type: "tuple",
        },
      ],
      outputs: [],
    },
    {
      name: "exportAll",
      inputs: [],
      outputs: [],
    },
    {
      name: "upgrade",
      inputs: [{ name: "c", type: "cell" }],
      outputs: [],
    },
  ],
  data: [{ key: 1, name: "debugNonce", type: "uint256" }],
  events: [],
};
export default {
  abi,
  imageBase64:
    "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",
};
