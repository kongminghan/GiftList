const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
// This was generated using MerkleTree.getRoot
const MERKLE_ROOT =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { list } = req.body;

  // verify all the names from the [list] payload
  const response = list.map(({proof, name}) => {
    const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
    if (isInTheList) {
      return "You got a toy robot!";
    } else {
      return "You are not on the list :(";
    }
  })

  res.send(response);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
