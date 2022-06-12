const express = require("express");
const router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage })
const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product");



//all of params

router.param("productId", getProductById);

//all of actual routes
//create route
router.post(
    "/product/create", upload.single('productImage'),
    createProduct
);

router.get(
    "/product",
    getAllProducts
);

// // read routes
router.get("/product/:productId", getProduct);
router.put("/product/:productId", updateProduct);

// //delete route
router.delete(
    "/product/:productId",
    deleteProduct
);



module.exports = router;