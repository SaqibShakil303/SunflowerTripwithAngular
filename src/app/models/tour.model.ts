export class Tour {
  id!: number;
   destination_id!: number;
  location_ids!: number[];
  title!: string;
  slug!: string;
  location!: string;
  description!: string;
  itinerary!:string;
  price!: number;
  image_url!: string;
  duration_days!:number;
  
    available_from!: string;
  available_to!: string;
  // created_at!: string;
  category!: string;

}

// src/app/models/tour.model.ts
export interface Tour {
 


}
