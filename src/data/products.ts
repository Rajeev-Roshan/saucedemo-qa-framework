export const PRODUCTS = {
  backpack: {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    dataTestId: 'add-to-cart-sauce-labs-backpack',
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    dataTestId: 'add-to-cart-sauce-labs-bike-light',
  },
  boltShirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
    dataTestId: 'add-to-cart-sauce-labs-bolt-t-shirt',
  },
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    price: '$49.99',
    dataTestId: 'add-to-cart-sauce-labs-fleece-jacket',
  },
  onesie: {
    name: 'Sauce Labs Onesie',
    price: '$7.99',
    dataTestId: 'add-to-cart-sauce-labs-onesie',
  },
};

export const SORT_OPTIONS = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
};

export const CHECKOUT_INFO = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '10001',
  },
  missingFirst: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '10001',
  },
  missingLast: {
    firstName: 'John',
    lastName: '',
    postalCode: '10001',
  },
  missingZip: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  },
};
