export const areAllFieldsFilled = (fields) => {
  return fields.every(
    (field) => typeof field === "string" && field.trim() !== ""
  );
};
