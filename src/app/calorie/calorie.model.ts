
interface ICalorie {
    food?: string;
    servingSize?: number;
    quantity?: number;
    calorieCount?: number;
    editing?: boolean;
}

export class Calorie {

    public food?: string;
    public servingSize: number;
    public quantity?: number;
    public calorieCount?: number;
    public editing?: boolean;

    constructor(calorie: ICalorie) {
        calorie.editing = this.setState(calorie);
        Object.assign(this, calorie);
    }

    setState(calorie: ICalorie){
        if(calorie == null || Object.keys(calorie).length == 0) {
            return true;
        }
        let editing = false;
        Object.keys(calorie).forEach((key) =>{
            console.log('from setState...', calorie[key])
            if(calorie[key] == null) {
                editing = true;
            }
        });
        return editing;
    }
}