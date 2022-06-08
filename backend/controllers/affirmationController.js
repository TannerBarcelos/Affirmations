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
    user: id,
    startMood: currentMood,
    endMood: '',
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
  const user = request.user;

  const affirm = await affirmationModel.findById(id);

  if (!affirm) {
    response.status(400);
    throw new Error('Affirmation not found');
  }
  if (affirm.user.toString() !== user.id) {
    response.status(401);
    throw new Error('User not authorized');
  }
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
  const user = request.user;

  const affirm = await affirmationModel.findById(id);

  if (!affirm) {
    response.status(400);
    throw new Error('Affirmation not found');
  }

  if (affirm.user.toString() !== user.id) {
    response.status(401);
    throw new Error('User not authorized');
  }

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
