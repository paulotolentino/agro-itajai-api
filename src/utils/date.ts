export const formatDate = (date: Date | string): Date => {
  // create a cashBalance using prisma
  const formatedDate = new Date(date);
  // Add 3 hours to the date to match the timezone, in case it changes the date
  formatedDate.setHours(formatedDate.getHours() + 3);
  // Set the time to 00:00:00
  formatedDate.setHours(0, 0, 0, 0);

  return formatedDate;
};
