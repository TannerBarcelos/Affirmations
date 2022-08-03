const affirmationModel = require('../models/affirmationModel')

/**
 * @description Get all affirmations
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const getAllAffirmations = async (request, response) => {
  try {
    const affirmations = await affirmationModel.find({ user: request.user.id })
    response.status(200).json(affirmations)
  } catch (error) {
    response.status(500)
    throw new Error(error)
  }
}

/**
 * @description Get a single affirmation
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const getSingleAffirmation = async (request, response) => {
  const { id } = request.params
  try {
    const affirmation = await affirmationModel.findById(id)
    const user = request.user // will always exist because the middleware will either set the user on the request object or redirect
    if (!affirmation) {
      response.status(400)
      throw new Error('This affirmation does not exist')
    }
    if (affirmation.user.toString() !== user.id) {
      response.status(401)
      throw new Error('User not authorized')
    }
    response.status(200).json({
      id: affirmation._id,
      ...affirmation,
    })
  } catch (error) {
    response.status(500)
    throw new Error(error)
  }
}

/**
 * @description Create a new affirmation
 * @method POST
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const createAffirmation = async (request, response) => {
  const { currentMood, affirmation } = request.body
  if (!currentMood || !affirmation) {
    response.status(400)
    throw new Error(
      'You must submit an affirmation and your current mood to log this entry',
    )
  }
  const { id } = request.user
  try {
    const affirm = await affirmationModel.create({
      user: id,
      startMood: currentMood,
      endMood: '',
      affirmation,
    })
    response.status(200).json(affirm)
  } catch (error) {
    response.status(500)
    throw new Error(error)
  }
}

/**
 * @description Update an affirmation
 * @method PUT
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const updateAffirmation = async (request, response) => {
  const { id } = request.params
  const { endMood, affirmation } = request.body
  const user = request.user

  try {
    const affirm = await affirmationModel.findById(id)

    if (!affirm) {
      response.status(400)
      throw new Error('Affirmation not found')
    }
    if (affirm.user.toString() !== user.id) {
      response.status(401)
      throw new Error('User not authorized')
    }

    const updatedAffirmation = await affirmationModel.findByIdAndUpdate(
      id,
      {
        endMood,
        affirmation,
      },
      { new: true },
    )
    response.status(200).json(updatedAffirmation)
  } catch (error) {
    response.status(500)
    throw new Error(error)
  }
}

/**
 * @description Delete an affirmation
 * @method DELETE
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const deleteAffirmation = async (request, response) => {
  const { id } = request.params
  const user = request.user

  try {
    const affirm = await affirmationModel.findById(id)

    if (!affirm) {
      response.status(400)
      throw new Error('Affirmation not found')
    }

    if (affirm.user.toString() !== user.id) {
      response.status(401)
      throw new Error('User not authorized')
    }

    await affirmationModel.remove(affirm)
    response.status(200).json({ id })
  } catch (error) {
    response.status(500)
    throw new Error(error)
  }
}

module.exports = {
  getAllAffirmations,
  getSingleAffirmation,
  createAffirmation,
  updateAffirmation,
  deleteAffirmation,
}
