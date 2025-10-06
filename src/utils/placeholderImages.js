// Placeholder image generator for development
export const generatePlaceholderImage = (width = 400, height = 300, text = 'Image', bgColor = 'FF9100', textColor = 'FFFFFF') => {
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

// Predefined placeholder images for different categories
export const placeholderImages = {
  office: generatePlaceholderImage(400, 300, 'Office Tools', 'FF9100', 'FFFFFF'),
  onsite: generatePlaceholderImage(400, 300, 'On-Site Tools', 'FF9100', 'FFFFFF'),
  training: generatePlaceholderImage(400, 300, 'Training', 'FF9100', 'FFFFFF'),
  faq: generatePlaceholderImage(400, 300, 'FAQ', 'FF9100', 'FFFFFF'),
  social: generatePlaceholderImage(400, 300, 'Social Media', 'FF9100', 'FFFFFF'),
  documents: generatePlaceholderImage(400, 300, 'Documents', 'FF9100', 'FFFFFF'),
  phone: generatePlaceholderImage(400, 300, 'Phone Scripts', 'FF9100', 'FFFFFF'),
  email: generatePlaceholderImage(400, 300, 'Email Templates', 'FF9100', 'FFFFFF'),
  map: generatePlaceholderImage(400, 300, 'Route Planning', 'FF9100', 'FFFFFF'),
  measurement: generatePlaceholderImage(400, 300, 'Roof Measurement', 'FF9100', 'FFFFFF'),
  calendar: generatePlaceholderImage(400, 300, 'Calendar', 'FF9100', 'FFFFFF'),
  postcode: generatePlaceholderImage(400, 300, 'Postcode Map', 'FF9100', 'FFFFFF'),
  weather: generatePlaceholderImage(400, 300, 'Weather Check', 'FF9100', 'FFFFFF'),
  quote: generatePlaceholderImage(400, 300, 'Quote Builder', 'FF9100', 'FFFFFF'),
  customers: generatePlaceholderImage(400, 300, 'Customer Database', 'FF9100', 'FFFFFF'),
  notepad: generatePlaceholderImage(400, 300, 'Daily Notepad', 'FF9100', 'FFFFFF'),
  training: generatePlaceholderImage(400, 300, 'Office Training', 'FF9100', 'FFFFFF'),
};
