const UserList = [
  {
    "id": 1,
    "name": "John Doe",
    "username": "johndoe123",
    "age": 30,
    "nationality": "USA",
    "friends": [
      {
        "id": 2,
        "name": "Jane Smith",
        "username": "janesmith456",
        "age": 25,
        "nationality": "Canada"
      },
      {
        "id": 3,
        "name": "Michael Johnson",
        "username": "mikej",
        "age": 28,
        "nationality": "UK"
      }
    ]
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "username": "janesmith456",
    "age": 25,
    "nationality": "Canada",
    "friends": [
      {
        "id": 1,
        "name": "John Doe",
        "username": "johndoe123",
        "age": 30,
        "nationality": "USA"
      }
    ]
  },
  {
    "id": 3,
    "name": "Michael Johnson",
    "username": "mikej",
    "age": 28,
    "nationality": "UK"
  },
  {
    "id": 4,
    "name": "Maria Garcia",
    "username": "mariag",
    "age": 32,
    "nationality": "Spain"
  },
  {
    "id": 5,
    "name": "Mohammed Ali",
    "username": "mali",
    "age": 27,
    "nationality": "Egypt"
  },
  {
    "id": 6,
    "name": "Luisa Silva",
    "username": "luisas",
    "age": 29,
    "nationality": "Brazil"
  },
  {
    "id": 7,
    "name": "Kim Lee",
    "username": "kiml",
    "age": 26,
    "nationality": "Korea"
  },
  {
    "id": 8,
    "name": "Andrea Rossi",
    "username": "andrear",
    "age": 31,
    "nationality": "Italy"
  },
  {
    "id": 9,
    "name": "Hiroshi Tanamura",
    "username": "hiroshit",
    "age": 33,
    "nationality": "Japan"
  },
  {
    "id": 10,
    "name": "Marta Hernandez",
    "username": "martah",
    "age": 28,
    "nationality": "Mexico"
  },
  {
    "id": 11,
    "name": "Anna Petrov",
    "username": "annap",
    "age": 29,
    "nationality": "Russia"
  },
  {
    "id": 12,
    "name": "Juan Lopez",
    "username": "juanl",
    "age": 35,
    "nationality": "Argentina"
  },
  {
    "id": 13,
    "name": "Chen Wei",
    "username": "chenw",
    "age": 27,
    "nationality": "China"
  },
  {
    "id": 14,
    "name": "Fatemeh Azizi",
    "username": "fatemeha",
    "age": 26,
    "nationality": "Iran"
  },
  {
    "id": 15,
    "name": "Marta Gonzalez",
    "username": "martag",
    "age": 30,
    "nationality": "Spain"
  },
  {
    "id": 16,
    "name": "Sergei Ivanov",
    "username": "sergeii",
    "age": 32,
    "nationality": "Russia"
  },
  {
    "id": 17,
    "name": "Fatima Khan",
    "username": "fatimak",
    "age": 29,
    "nationality": "Pakistan"
  },
  {
    "id": 18,
    "name": "Carlos Ramirez",
    "username": "carlosr",
    "age": 28,
    "nationality": "Mexico"
  },
  {
    "id": 19,
    "name": "Aisha Ahmed",
    "username": "aishaa",
    "age": 27,
    "nationality": "Arabia"
  },
  {
    "id": 20,
    "name": "Sophie Dupont",
    "username": "sophied",
    "age": 31,
    "nationality": "France"
  }
];

const MovieList = [
  {
    "id": 1,
    "name": "Goodfellas",
    "yearOfPublication": 2001,
    "isInTheaters": true
  },
  {
    "id": 2,
    "name": "The Godfather",
    "yearOfPublication": 2002,
    "isInTheaters": false
  },
  {
    "id": 3,
    "name": "The Silence of the Lambs",
    "yearOfPublication": 2003,
    "isInTheaters": true
  },
  {
    "id": 4,
    "name": "Jurassic Park",
    "yearOfPublication": 2004,
    "isInTheaters": false
  },
  {
    "id": 5,
    "name": "Schindler's List",
    "yearOfPublication": 2005,
    "isInTheaters": true
  },
  {
    "id": 6,
    "name": "Pulp Fiction",
    "yearOfPublication": 2006,
    "isInTheaters": false
  },
  {
    "id": 7,
    "name": "Avatar",
    "yearOfPublication": 2007,
    "isInTheaters": true
  },
  {
    "id": 8,
    "name": "Forrest Gump",
    "yearOfPublication": 2008,
    "isInTheaters": false
  },
  {
    "id": 9,
    "name": "The Lord of the Rings",
    "yearOfPublication": 2009,
    "isInTheaters": true
  },
  {
    "id": 10,
    "name": "E.T. the Extra-Terrestrial",
    "yearOfPublication": 2010,
    "isInTheaters": false
  },
  {
    "id": 11,
    "name": "Star Wars",
    "yearOfPublication": 2011,
    "isInTheaters": true
  },
  {
    "id": 12,
    "name": "The Matrix",
    "yearOfPublication": 2012,
    "isInTheaters": false
  },
  {
    "id": 13,
    "name": "Fight Club",
    "yearOfPublication": 2013,
    "isInTheaters": true
  },
  {
    "id": 14,
    "name": "Braveheart",
    "yearOfPublication": 2014,
    "isInTheaters": false
  },
  {
    "id": 15,
    "name": "Titanic",
    "yearOfPublication": 2015,
    "isInTheaters": true
  },
  {
    "id": 16,
    "name": "The Terminator",
    "yearOfPublication": 2016,
    "isInTheaters": false
  },
  {
    "id": 17,
    "name": "Inception",
    "yearOfPublication": 2017,
    "isInTheaters": true
  },
  {
    "id": 18,
    "name": "The Shawshank Redemption",
    "yearOfPublication": 2018,
    "isInTheaters": false
  },
  {
    "id": 19,
    "name": "Gladiator",
    "yearOfPublication": 2019,
    "isInTheaters": true
  },
  {
    "id": 20,
    "name": "The Dark Knight",
    "yearOfPublication": 2020,
    "isInTheaters": false
  }
];

module.exports = { UserList, MovieList };