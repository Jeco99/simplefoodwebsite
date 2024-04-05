export const validateHttps = (poster_path: string) => {
  const regex =
    /^(https:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
  return regex.test(poster_path);
};

export const phoneNumber_format = (phoneNumber: any) => {
  const formattedNumber = `(${phoneNumber.slice(0, 4)}) 
        ${phoneNumber.slice(4, 7)} - ${phoneNumber.slice(7)}`;
  return formattedNumber;
};

export const formatTitle = (title: any) => {
  return title.toUpperCase();
};

export const formatDescription = (description: any) => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

export const formatPopularity = (popularity: any) => {
  return parseFloat(popularity).toFixed(1);
};
