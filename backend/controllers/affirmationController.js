function getAllAffirmations(request, response) {
  response.status(200).json({ message: 'All Affirmations' });
}

module.exports = {
  getAllAffirmations,
};
