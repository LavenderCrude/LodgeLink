import dotenv from 'dotenv';
dotenv.config();
import Listing from '../models/listing.js';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Show all listings
export const getAllListings = async (req, res) => {
  const listings = await Listing.find();
  res.render('listings/index.ejs', { listings });
};

// Render new listing form
export const renderNewForm = (req, res) => {
  res.render('listings/newLodge.ejs');
};

// Create a new listing
export const createListing = async (req, res, next) => {
  const geoData = await geocodingClient
    .forwardGeocode({
      query: req.body.location,
      limit: 1,
    })
    .send();

  const geometry = geoData.body.features[0]?.geometry;

  if (!geometry) {
    req.flash('error', 'Invalid location. Could not find coordinates.');
    return res.redirect('/listing/new');
  }

  const { title, description, price, location, country } = req.body;
  const url = req.file.path;
  const filename = req.file.filename;

  const listing = new Listing({
    title,
    description,
    price,
    location,
    country,
    image: { url, filename },
    owner: req.user._id,
    geometry,
  });

  const savedListing = await listing.save();

  console.log('Data Saved:', savedListing);
  req.flash('success', 'Listing Added');
  res.redirect('/listing');
};

// Render edit form
export const renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Listing does not exist');
    return res.redirect('/listing');
  }
  res.render('listings/edit.ejs', { listing });
};

// Update listing
export const updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country } = req.body;

  const geoData = await geocodingClient
    .forwardGeocode({
      query: location,
      limit: 1,
    })
    .send();

  const geometry = geoData.body.features[0]?.geometry;

  if (!geometry) {
    req.flash('error', 'Invalid location. Could not find coordinates.');
    return res.redirect(`/listing/${id}/edit`);
  }

  const listing = await Listing.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      location,
      country,
      geometry,
    },
    { new: true }
  );

  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash('success', 'Listing updated successfully.');
  res.redirect(`/listing/${id}`);
};

// Show listing details
export const showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('owner');

  if (!listing) {
    req.flash('error', 'Listing does not exist');
    return res.redirect('/listing');
  }

  console.log(listing);
  res.render('listings/show.ejs', { listing });
};

// Delete listing
export const deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash('success', 'Listing Deleted');
  res.redirect('/listing');
};
