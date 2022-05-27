const asyncHandler = require('express-async-handler');
const affirmationModel = require('../models/affirmationModel');
/**
 * @description Get all affirmations
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const getAllAffirmations = asyncHandler(async (request, response) => {
  const affirmations = await affirmationModel.find({ user: request.user.id });
  response.status(200).json(affirmations);
});

/**
 * @description Get a single affirmation
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const getSingleAffirmation = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const affirmation = await affirmationModel.findById(id);

  if (!affirmation) {
    response.status(400);
    throw new Error('This affirmation does not exist');
  }

  // Make sure the authenticated user is the same user as the one attached to this affirmation (using the ID as the predicate)
  if (affirmation.user.toString() !== user.id) {
    response.status(401);
    throw new Error('User not authorized');
  }

  response.status(200).json(affirmation);
});

/**
 * @description Create a new affirmation
 * @method POST
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const createAffirmation = asyncHandler(async (request, response) => {
  const { currentMood, affirmation } = request.body;
  if (!currentMood || !affirmation) {
    response.status(400);
    throw new Error(
      'You must submit an affirmation and your current mood to log this entry',
    );
  }
  const { id } = request.user;
  const affirm = await affirmationModel.create({
    user: id, // save the user by their ID who created this entry
    startMood: currentMood,
    endMood: '', // leave blank as this gets submited via the update mood later
    affirmation,
  });
  response.status(200).json(affirm);
});

/**
 * @description Update an affirmation
 * @method PUT
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const updateAffirmation = asyncHandler(async (request, response) => {
  const { id } = request.params; // pull out id of affirmation from params
  const { mood, affirmation } = request.body; // get updated data from body
  const user = request.user; // get user from user object in the request which is yielded by passing the protected middleware wrapping this route

  // Try to find this affirmation
  const affirm = await affirmationModel.findById(id);

  // If the affirmation is not found, throw an error and return to client
  if (!affirm) {
    response.status(400);
    throw new Error('Affirmation not found');
  }
  // Check that the logged in user matches the user of the affirmation we are updating - if it is not a match, user is not authorized
  if (affirm.user.toString() !== user.id) {
    response.status(401);
    throw new Error('User not authorized');
  }
  // If found, update the found affirmation with updated mood and affirmation data and re-create the object with a new object instance
  const updatedAffirmation = await affirmationModel.findByIdAndUpdate(
    id,
    {
      mood,
      affirmation,
    },
    { new: true },
  );
  response.status(200).json(updatedAffirmation);
});

/**
 * @description Delete an affirmation
 * @method DELETE
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const deleteAffirmation = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const user = request.user; // get user from user object in the request which is yielded by passing the protected middleware wrapping this route

  // Try to find the affirmation
  const affirm = await affirmationModel.findById(id);

  // If not found, throw an error and return to client
  if (!affirm) {
    response.status(400);
    throw new Error('Affirmation not found');
  }

  // If found, Same as edit - Check that the logged in user matches the user of the affirmation we are updating - if it is not a match, user is not authorized
  if (affirm.user.toString() !== user.id) {
    response.status(401);
    throw new Error('User not authorized');
  }

  // Delete if found and return the deleted affirmations ID so we can use that client side to filter the UI
  await affirmationModel.remove(affirm);
  response.status(200).json({ _id: id });
});

module.exports = {
  getAllAffirmations,
  getSingleAffirmation,
  createAffirmation,
  updateAffirmation,
  deleteAffirmation,
};
