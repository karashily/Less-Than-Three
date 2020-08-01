import { foodNutritionData } from "../data/foodNutritionData";

export class ApiUtils{

    public foodNames: any=[];

    getFoodNutrients(){
        
    }

    public parseFoodNutritionData(): [string]{
        for (let foodNutrition of foodNutritionData.foodData){
            this.foodNames.push(foodNutrition.Ingredient_Name);
        }
        return this.foodNames;
      }
}