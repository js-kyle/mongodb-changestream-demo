// Select the database to use.
use('grocerystore');

// Insert a few documents into the sales collection.
db.getCollection('drinks').insertMany([
  { 'name': 'pepsi', 'price': 3, 'quantity': 10 },
  { 'name': 'cocacola', 'price': 4, 'quantity': 10 }
]);

