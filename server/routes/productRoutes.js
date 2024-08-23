const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const adminCheck = require("../middleware/adminCheck");
const upload = require("../middleware/multer"); // Assuming you're using multer for file uploads
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",

  upload.single("image"),
  createProduct
);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, adminCheck, upload.single("image"), updateProduct);
router.delete("/:id", protect, adminCheck, deleteProduct);

module.exports = router;
