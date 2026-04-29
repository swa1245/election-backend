export const SUPPORTED_COUNTRIES = [
  'USA',
  'India',
  'UK',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'South Africa'
] as const;

export type SupportedCountry = typeof SUPPORTED_COUNTRIES[number];
