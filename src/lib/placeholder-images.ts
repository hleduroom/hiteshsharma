import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  name: string;      // Added for CardTitle and Schema.org
  description: string;
  imageUrl: string;
  imageHint: string;
  url: string;       // Added for active project link and Schema.org
  tags: string[];    // Added for Schema.org keywords
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages as ImagePlaceholder[];
