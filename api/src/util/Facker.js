const { getRandomInt } = require("./Helpers");

const maleName = [
  "Aarav",
  "Vihaan",
  "Vivaan",
  "Ananya",
  "Daya",
  "Advik",
  "Kabir",
  "Anaya",
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vivaan",
  "Vihban",
  "Arjun",
  "Vivaan",
  "Reyansh",
  "Mohammed",
  "Sai",
  "Arnav",
  "Aayan",
  "Krishna",
  "Ishaan",
  "Shaurya",
  "Atharva",
  "Advik",
  "Pranav",
  "Advaith",
  "Aaryan",
  "Dhruv",
  "Kabir",
  "Ritvik",
  "Aarush",
  "Kian",
  "Darsh",
  "Veer",
];
const femaleName = [
  "Saanvi",
  "Anya",
  "Aadhya",
  "Aaradhya",
  "Ananya",
  "Pari",
  "Anika",
  "Navya",
  "Angel",
  "Diya",
  "Myra",
  "Sara",
  "Iraa",
  "Ahana",
  "Anvi",
  "Prisha",
  "Riya",
  "Aarohi",
  "Anaya",
  "Akshara",
  "Eva",
  "Shanaya",
  "Kyra",
  "Siya",
];
const location = [
  {
    country: "BD",
    city: "Mirpur",
  },
  {
    country: "IN",
    city: "Kolkata",
  },
  {
    country: "BD",
    city: "Gulshan",
  },
  {
    country: "BD",
    city: "Mohakhali",
  },
  {
    country: "IN",
    city: "Mumbai",
  },
];
module.exports = class Facker {
  static maleNameGenerate = (generateLength) => {
    let names = [];
    let getRandomIndexArray = Facker.getRandomIndex(generateLength, maleName.length);
    getRandomIndexArray.forEach(element=>{
      names.push({name: maleName[element], pictureUrl:`https://ulka-profile-pics.s3.ap-south-1.amazonaws.com/male/male_image_${element}.jpg`});
    })
    return names;
  };
  static femaleNameGenerate = (generateLength) => {
    let names = [];
    let getRandomIndexArray = Facker.getRandomIndex(generateLength, femaleName.length);
    getRandomIndexArray.forEach(element=>{
      names.push({name: femaleName[element], pictureUrl:`https://ulka-profile-pics.s3.ap-south-1.amazonaws.com/female/female_image_${element}.jpg`});
    })
    return names;
  };
  static locationGenerate = () => {
    let index = getRandomInt(location.length);
    return location[index];
  };

   static getRandomIndex = (generateLength, arrayLength) => {
    let newIndexArray = [];
    let index = 0;
    for (var i = 0; i < generateLength; i++) {
      index = getRandomInt(arrayLength);
      while (newIndexArray.indexOf(index) !== -1) {
        index = getRandomInt(arrayLength);
      }
      newIndexArray.push(index);
    }
    return newIndexArray;
  };
};
