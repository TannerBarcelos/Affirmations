export const generateDate = (createdAt) => {
  const creationDate = new Date(createdAt).toLocaleDateString('en-US')
  return creationDate
}
