
url samples:
1. https://metadata-server-wood.herokuapp.com/api/images/1 get image
2. https://metadata-server-wood.herokuapp.com/api/metadata/1 get metadata

url samples local:
1. http://localhost:4000/api/metadata/2 -> {"attributes":[{"trait_type":"Background","value":"Light Purple"},{"trait_type":"Skin","value":"Light Chocolate"},{"trait_type":"Body Gear","value":"Leather Jacket"},{"trait_type":"Mane","value":"Light Brown"},{"trait_type":"Mouth","value":"Rose"},{"trait_type":"Ear","value":"Hoops"},{"trait_type":"Eyes","value":"Gold Intrigue"},{"trait_type":"Head Gear","value":"Opera"}],"name":"Cheeky Cougar #2","image":"ipfs://QmX5rF55nRfzs8nEXA7wC2eREieHq5Xynh6kghyR6NfTau/2.png","external_url":"https://www.cheekycougarclub.com/"}
2. http://localhost:4000/api/metadata/100 -> { "image": "ipfs://QmTg3qdj7iqd3SZKfNZ8m16wC6HfQ7WpXk3SaicYfEif9y", "external_url": "https://cheekylionclub.com/" }

deps:
1. make images and metadata folders in the same directory
2. put pre_reveal.json and pre_reveal.jpg metadata and image in the folders

road map:
1. provide metadata of only those nfts that are minted
2. refresh metadata on opensea once nft is minted
3. make offer of 0.00001 ETH etc