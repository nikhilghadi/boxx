export  const getAge =(dateString)=> {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export  const getGenders =()=> {
 return [["Male", "male"], ["Female", "female"], ["Others", "others"]]
}

export const getDraw =(numberOfPlayers)=>{
  let bracketSize = 1;
  while (bracketSize < numberOfPlayers) {
      bracketSize *= 2;
  }
  const byes = bracketSize - numberOfPlayers;
  const bouts = (numberOfPlayers - byes)/2;
  const rounds = Math.ceil(Math.log2(numberOfPlayers));
  return {
      byes,
      bouts,
      rounds
  };
}

export const isPowerOfTwo=(n)=> {
  return n > 0 && (Math.log2(n) % 1 === 0);
}
