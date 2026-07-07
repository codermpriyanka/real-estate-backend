const expres= require('express')
const router = expres.Router()
const propertyRoutes=require('../controllers/propertyController')
const upload = require('../middleware/uploads');
//create
router.post("/add-property",upload.single('photos'),propertyRoutes.addProperty);

router.get("/get-all-properties",propertyRoutes.getAllProperties);
// READ (specific first)
router.get('/admin-properties',propertyRoutes.getAllPropertiesAdmin);
router.get('/buyer-properties',propertyRoutes.getApprovedProperties);
router.get('/my-bought-properties/:buyerId',propertyRoutes.getMyBoughtProperty);
// update spicial actions
router.put('/approve-property/:id',propertyRoutes.adminwillapproveProperty);
router.put('/buy-property/:id',propertyRoutes.buyStatus);
// CRUD
router.put("/update-property/:id",propertyRoutes.sellerUpdatePropertyById);
router.delete("/delete-property/:id",propertyRoutes.deletePropertyById);
// READ BY ID (KEEP LAST)
router.get("/:id",propertyRoutes.getPropertyById);


module.exports=router