const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

// This goes on the API Server
const tree = new MerkleTree(niceList);

async function main() {  
  // This will be the lucky guy who will win the gift
  const luckyGuy = "Robin Hessel Jr.";
  const index = niceList.indexOf(luckyGuy);

  // Proof
  const proof = tree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof, name: luckyGuy
  });

  console.log({ gift });
}

main();