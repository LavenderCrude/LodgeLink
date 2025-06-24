import Listing from '../models/listing.js';

export const getAllListings = async (req, res) => {
  const listings = await Listing.find();
  res.render('listings/index.ejs', { listings });
};

export const renderNewForm = (req, res) => {
  res.render('listings/newLodge.ejs');
};

export const createListing = async (req, res) => {
  const { title, description, price, location, country } = req.body;
  let url = req.file.path;
  let filename = req.file.filename;
  const listing = new Listing({
    title,
    description,
    price,
    location,
    country,
  });
  listing.image = { url, filename };
  listing.owner = req.user._id; //current user session
  const savedListing = await listing.save();

  console.log('Data Saved:', savedListing);
  req.flash('success', 'Listing Added');
  res.redirect('/listing');
};

export const renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Listing does not exist');
    return res.redirect('/listing');
  }
  res.render('listings/edit.ejs', { listing });
};

export const updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country, image } = req.body;
  await Listing.findByIdAndUpdate(id, {
    title,
    description,
    price,
    location,
    country,
    image,
  });
  req.flash('success', 'Listing updated successfully.');
  res.redirect(`/listing/${id}`);
};

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

export const deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash('success', 'Listing Deleted');
  res.redirect('/listing');
};
