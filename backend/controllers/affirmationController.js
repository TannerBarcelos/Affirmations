const asyncHandler = require('express-async-handler');
const affirmationModel = require('../models/affirmationModel');
/**
 * @description Get all affirmations
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const getAllAffirmations = asyncHandler(async (request, response) => {
  const affirmations = await affirmationModel.find();
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
  response.status(200).json({ message: `Get single affirmation by ID: ${id}` });
});

/**
 * @description Create a new affirmation
 * @method POST
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const createAffirmation = asyncHandler(async (request, response) => {
  const { mood, affirmation } = request.body;
  if (!mood || !affirmation) {
    response.status(400);
    throw new Error(
      'You must submit an affirmation and mood to log this entry',
    );
  }
  const affirm = await affirmationModel.create({
    mood,
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
  const { id } = request.params;
  const { mood, affirmation } = request.body;

  // Try to find this affirmation
  const affirm = await affirmationModel.findById(id);

  // If not found, throw an error and return to client
  if (!affirm) {
    response.status(400);
    throw new Error('Affirmation not found');
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

  // Try to find this affirmation
  const affirm = await affirmationModel.findById(id);

  // If not found, throw an error and return to client
  if (!affirm) {
    response.status(400);
    throw new Error('Affirmation not found');
  }
  // Delete if found and return the deleted affirmations ID so we can use that client side to filter the UI
  await affirmationModel.remove(affirm);
  response.status(200).json(id);
});

module.exports = {
  getAllAffirmations,
  getSingleAffirmation,
  createAffirmation,
  updateAffirmation,
  deleteAffirmation,
};
