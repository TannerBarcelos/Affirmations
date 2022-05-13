/**
 * @description Get all affirmations
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
function getAllAffirmations(request, response) {
  response.status(200).json({ message: 'All Affirmations' });
}

/**
 * @description Get a single affirmation
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
function getSingleAffirmation(request, response) {
  const { id } = request.params;
  response.status(200).json({ message: `Get single affirmation by ID: ${id}` });
}

/**
 * @description Create a new affirmation
 * @method POST
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
function createAffirmation(request, response) {
  response.status(200).json({ message: 'Create Affirmation' });
}

/**
 * @description Update an affirmation
 * @method PUT
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
function updateAffirmation(request, response) {
  const { id } = request.params;
  response.status(200).json({ message: `Updated affirmation by ID: ${id}` });
}

/**
 * @description Delete an affirmation
 * @method DELETE
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
function deleteAffirmation(request, response) {
  const { id } = request.params;
  response.status(200).json({ message: `Deleted affirmation by ID: ${id}` });
}

module.exports = {
  getAllAffirmations,
  getSingleAffirmation,
  createAffirmation,
  updateAffirmation,
  deleteAffirmation,
};
