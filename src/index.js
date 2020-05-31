const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
  const cartProducts = productsList.filter((product) =>
    ids.includes(product.id)
  );

  const cartProductsFormatted = cartProducts.map((product) => {
    return { name: product.name, category: product.category };
  });

  const productsCategories = cartProducts.reduce((prev, cur) => {
    if (!prev.includes(cur.category)) {
      return [...prev, cur.category];
    } else {
      return prev;
    }
  }, []);

  const promotion = promotions[productsCategories.length - 1];

  const totalPrice = cartProducts.reduce((prev, cur) => {
    const productPromotion = cur.promotions.find((prom) =>
      prom.looks.includes(promotion)
    );

    if (!productPromotion) {
      return prev + cur.regularPrice;
    }

    return prev + productPromotion.price;
  }, 0);

  const totalPriceWithoutDiscount = cartProducts.reduce((prev, cur) => {
    return prev + cur.regularPrice;
  }, 0);

  const discountValue = totalPriceWithoutDiscount - totalPrice;

  const discountPercentage = `${(
    (discountValue / totalPriceWithoutDiscount) *
    100
  ).toFixed(2)}%`;

  return {
    products: cartProductsFormatted,
    promotion,
    totalPrice: totalPrice.toFixed(2),
    discountValue: discountValue.toFixed(2),
    discount: discountPercentage,
  };
}

module.exports = { getShoppingCart };
