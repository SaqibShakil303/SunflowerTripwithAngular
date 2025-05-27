export interface Location {
   id: number;
  name: string;
  description: string;
  image_url: string;
  iframe_360: string;
}

export interface Attraction {
  title: string;
  image_url: string;
  rating: number;
  video_url?: string;
}

export interface Ethnicity {
  title: string;
  image_url: string;
}

export interface Cuisine {
  title: string;
  image_url: string;
}

export interface Activity {
  title: string;
  image_url: string;
}

export interface ItineraryBlock {
  title: string;
  description: string;
}

export interface Tour {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  description: string;
  price: number;
  duration_days: number;
}

export interface Destination {
  id: number;
  title: string;
  slug?: string;
  description: string;
  image_url: string;
  best_time_to_visit: string;
  weather: string;
  currency: string;
  language: string;
  time_zone: string;
  locations: Location[];
  attractions: Attraction[];
  ethnicities: Ethnicity[];
  cuisines: Cuisine[];
  activities: Activity[];
  itinerary_blocks: ItineraryBlock[];
  tours: Tour[];
}
