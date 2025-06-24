import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { isListingOwner } from '../middlewares/isOwner.js';
import { validateListing } from '../middlewares/validate.js';
import * as listingController from '../controllers/listings.js';
import multer from 'multer';
import { storage } from '../cloudConfig.js';

const router = express.Router();
// Multer config (stores in /uploads folder temporarily)
const upload = multer({ storage });

// Index
router.get('/', wrapAsync(listingController.getAllListings));

// New Form
router.get('/newLodge', isLoggedIn, listingController.renderNewForm);

// Create
router.post(
  '/newLodge/upload',
  isLoggedIn,
  upload.single('image'),
  validateListing,
  wrapAsync(listingController.createListing)
);

// router.post('/newLodge/upload', upload.single('image'), (req, res) => {
//   res.send(req.file);
// });

// Edit + Update
router
  .route('/:id/edit')
  .get(isLoggedIn, isListingOwner, wrapAsync(listingController.renderEditForm))
  .put(
    isLoggedIn,
    isListingOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  );

// Show
router.get('/:id', wrapAsync(listingController.showListing));

// Delete
router.delete(
  '/:id/delete',
  isLoggedIn,
  isListingOwner,
  wrapAsync(listingController.deleteListing)
);

export default router;
