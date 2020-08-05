import { Food } from "./food";
import { Emotion } from "./emotion";

export interface FoodEntry {
    food: Food;
    time: string;
    initialEmotion: Emotion;
    finalEmotion: Emotion;
 }