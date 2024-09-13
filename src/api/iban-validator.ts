// Function to validate IBAN using IBAN.com API
export const validateIban = async (iban: string): Promise<boolean> => {
  const key = 'fd02b8cdb891d4fc2071c2fff8aab90b548b3193'; // this is a sample API key
  try {
    const response = await fetch(
      `https://api.ibanapi.com/v1/validate-basic/${iban}?api_key=${key}`,
    );
    const data = await response.json();
    return data.result === 200;
  } catch (error) {
    console.error('Error validating IBAN:', error);
    return false;
  }
};
