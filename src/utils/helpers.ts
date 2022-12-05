/**
 * Checks if a given field is empty or undefined
 * @param {string} text
 * @param {string} field
 * @returns {boolean}
 */
 export const isNotEmpty = (text: string, field: string): boolean => {
    if (text?.trim() === '' || !text)
      throw new Error(`Field ${field} is required.`);
    return true;
  };
  
  /**
 * Checks if a given field is not null or an empty string
 * @param {string} text
 * @param {string} field
 * @returns {boolean}
 */
export const isNotNull = (text: string, field: string): boolean => {
    if (text.trim() === '')
      throw new Error(`Field ${field} should not be empty.`);
    return true;
  };
  