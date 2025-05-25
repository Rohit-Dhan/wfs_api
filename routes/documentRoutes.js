const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../middlewares/upload');
const authorizeRoles = require('../middlewares/authorizeRoles');


router.post('/upload', authorizeRoles('admin', 'hr'), upload.single('file'), documentController.uploadDocument);
router.get('/employee/:employee_id', documentController.getDocumentsByEmployee);
router.put('/:id', upload.single('file'), documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
