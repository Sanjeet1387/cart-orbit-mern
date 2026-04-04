//we create the separate controller for both admin and shop, because we have to implement the different features on each
//let example in shop , we have to also implement the filter functionality.

const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
  
    const { category = [], brand = [], sortBy = "price-lowtohigh"} = req.query;

    let filters = {};

    if(category.length){
      filters.category = {$in: category.split(',')}
    }

    if(brand.length){
      filters.brand = {$in: brand.split(',')}
    }

    let sort = {};

    switch (sortBy) {
      case 'price-lowtohigh':
        sort.price = 1
        break;

      case 'price-hightolow':
      sort.price = -1
      break;

      case 'title-atoz':
      sort.title = 1
      break;

      case 'title-ztoa':
      sort.title = -1
      break;

      default:
        sort.price = 1
        break;
    }

    const products = await Product.find(filters).sort(sort);
    //now pass all these information to the redux store(i.e, in client/src/store/shop/product-slice/index.js), because without it, it will not work

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//now working on product's details functionality
const getProductDetails = async(req, res)=> {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);

    if(!product) return res.status(404).json({
      success: false,
      message: 'Product not found!'
    });
    //or else
    
      res.status(200).json({
        success: true,
        data: product,
      });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
}

module.exports = { getFilteredProducts, getProductDetails };
