import { Food } from "./food";
import { Emotion } from "./emotion";

export interface FoodEntry {
    food: Food;
    time: number;
    initialEmotion: Emotion;
    finalEmotion: Emotion;
 }