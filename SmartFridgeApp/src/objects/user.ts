import { Food } from "./food";
import { FoodEntry } from "./foodEntry";

export interface User {
   uid: string;
   name: string;
   foodEntries: Map<Long, FoodEntry>;
   fridge: [Food];
   groceryList: [Food];
}