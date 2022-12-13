const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

// This goes on the API Server
const tree = new MerkleTree(niceList);

async function main() {  
  const guys = [
    // These will be the lucky guys who will win the gift
    "Sidney Kertzmann",
    "Miss Margarita Lowe Sr.",
    "Dr. Olga Kassulke",
    "Chris Windler",
    "Robin Hessel Jr.",
    "Alexander Franey",
    "Traci McDermott",
    "Anna Stehr",
    "Norman Block",
    "Mr. Janice Ryan",
    // Adding a random name which is not in the list
    "APPLE",
  ];

  const data = guys.map((guy) => {
    // Index of that guy in the list
    const index = niceList.indexOf(guy);

    // Proof
    const proof = tree.getProof(index);

    return {
      index,
      proof,
      name: guy,
    };
  });

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    list: data
  });

  console.log({ gift });
}

main();