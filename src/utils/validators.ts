import { SUPPORTED_COUNTRIES, SupportedCountry } from '../constants/countries.js';

export const isValidCountry = (country: string): country is SupportedCountry => {
  return SUPPORTED_COUNTRIES.includes(country as SupportedCountry);
};

export const validateChatMessage = (message: string) => {
  if (!message || typeof message !== 'string') {
    return 'Message is required and must be a string';
  }
  if (message.length > 1000) {
    return 'Message is too long (max 1000 characters)';
  }
  return null;
};
