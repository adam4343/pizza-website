export const categories = [
  {
    name: "Pizzas",
  },
  {
    name: "Breakfast",
  },
  {
    name: "Snacks",
  },
  {
    name: "Cocktails",
  },
  {
    name: "Drinks",
  },
];

export const ingredients = [
  {
    name: "Cheese side",
    price: 179,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
  },
  {
    name: "Creamy mozzarella",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
  },
  {
    name: "Cheddar and Parmesan cheeses",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
  },
  {
    name: "Hot jalapeno pepper",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
  },
  {
    name: "Tender chicken",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
  },
  {
    name: "Champignons",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
  },
  {
    name: "Ham",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
  },
  {
    name: "Spicy pepperoni",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
  },
  {
    name: "Spicy chorizo",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
  },
  {
    name: "Pickled cucumbers",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
  },
  {
    name: "Fresh tomatoes",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
  },
  {
    name: "Red onion",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
  },
  {
    name: "Juicy pineapples",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
  },
  {
    name: "Italian herbs",
    price: 39,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
  },
  {
    name: "Sweet pepper",
    price: 59,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
  },
  {
    name: "Cheese cubes",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
  },
  {
    name: "Meatballs",
    price: 79,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: "Omelette with ham and mushrooms",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp",
    description:
      "A classic combination of hot omelet with a crispy crust and bacon with the addition of mozzarella and tomatoes for breakfast",
    categoryId: 2,
  },
  {
    name: "Omelette with pepperoni",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp",
    description:
      "Hearty and balanced breakfast - crispy omelette, spicy pepperoni, tomatoes and mozzarella",
    categoryId: 2,
  },
  {
    name: "Coffee Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    description:
      "When you want delicate milk foam, a classic latte comes to the rescue",
    categoryId: 2,
  },
  {
    name: "Danwich ham and cheese",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp",
    description:
      "Crispy ciabatta and the familiar combination of ham, chicken, mozzarella with fresh tomatoes, ranch sauce and garlic",
    categoryId: 3,
  },
  {
    name: "Chicken nuggets",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp",
    description: "Tender chicken meat in crispy breading",
    categoryId: 3,
  },
  {
    name: "Oven potatoes with sauce 🌱",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
    description: "Oven-baked potatoes with spicy spices. Cheese sauce included",
    categoryId: 3,
  },
  {
    name: "Dodster",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
    description:
      "Legendary hot appetizer with chicken, tomatoes, mozzarella, ranch sauce in a thin wheat tortilla",
    categoryId: 3,
  },
  {
    name: "Spicy Dodster 🌶️🌶️",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
    description:
      "Hot appetizer with chicken, jalapeno pepper, pickled cucumbers, tomatoes, mozzarella and barbecue sauce in a thin wheat tortilla",
    categoryId: 3,
  },
  {
    name: "Blackberry-raspberry milkshake",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/11EF4CE5FC600B3F988C3672BE140FE4.avif",
    description:
      "The creamy coolness of a classic milkshake with the addition of wild berries",
    categoryId: 4,
  },
  {
    name: "Milkshake Pina Colada",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/11EEA69D93F852E5BBC7C51280251105.avif",
    description:
      "Tropical combination of coconut and pineapple in a delicate milkshake",
    categoryId: 4,
  },
  {
    name: "Oreo milkshake",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp",
    description:
      "What's the best way to eat cookies? It's better to drink it! Try a milkshake with ice cream and crushed Oreo cookies.",
    categoryId: 4,
  },
  {
    name: "Classic milkshake 👶",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp",
    description:
      "There are so many cocktails in the world, but the classics are timeless. Try our milk drink with ice cream",
    categoryId: 4,
  },
  {
    name: "Coffee Caramel Cappuccino",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/11EE7D61AED6B6D4BFDAD4E58D76CF56.avif",
    description:
      "If not chocolate, then caramel! And cappuccino with caramel syrup is especially good",
    categoryId: 5,
  },
  {
    name: "Coffee Hazelnut Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:233x233/11EE7D61B12220AB911FF4FA42EF585D.avif",
    description:
      "Lots of milk and hazelnuts. Cozy latte based on espresso and nut syrup",
    categoryId: 5,
  },
  {
    name: "Coffee Coconut Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp",
    description: "Hot espresso drink with extra milk and coconut syrup",
    categoryId: 5,
  },
  {
    name: "Coffee Americano",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp",
    description:
      "A couple of sips of hot Americano and you'll be ready to conquer the day.",
    categoryId: 5,
  },
  {
    name: "Coffee Latte",
    imageUrl:
      "https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp",
    description:
      "When you want delicate milk foam, a classic latte comes to the rescue",
    categoryId: 5,
  },
];
