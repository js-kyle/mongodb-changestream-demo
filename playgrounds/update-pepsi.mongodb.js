// Select the database to use.
use('grocerystore');

console.log(`Current Pepsi quantity is ${
  db.getCollection('drinks').findOne(
    { 'name': 'pepsi'}
  ).quantity
  }`
);

console.log('Customer is purchasing 2 cans of Pepsi..');

db.getCollection('drinks').updateOne(
  { 'name': 'pepsi'}, {$inc: { 'quantity': -2 } },
);

console.log(`New Pepsi quantity is ${
    db.getCollection('drinks').findOne(
      { 'name': 'pepsi'}
    ).quantity
  }`
)