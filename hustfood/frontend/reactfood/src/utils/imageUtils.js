export const getImageUrl = (path) => {
  if (!path) {
    return '';
  }
  
  return `${process.env.PUBLIC_URL}/${path}`;
};