# TypedGoose(beacuse typegoose is already a thing it just sucks)

## Description 
Basically a Macro to avoid the headache of writing typed mongoose schemas
examples are in models.ts


## Usage 

![image](https://user-images.githubusercontent.com/54558961/183461644-d014623b-e759-443a-9152-57ee0ae07eca.png)


## Result 
![image](https://user-images.githubusercontent.com/54558961/183461855-e3ef9e27-2a28-44dc-8519-b7a2a5709edb.png)


## Notes
-Push Gets weird Correct Syntax is
`    let samp = await Sample.findOneAndUpdate({name: "2603"}, {$push: { "finish": {name: "black", shelf: "11", spot: "A", inventory: 58} }})`
