// class to define type of keys in bankdeposits along with there default values

export class BankDeposits {
    id: number;
    depositType: string;
    depositAmount: number;
    rateOfInterest: number;
    maturityAmount: number;
    tenure: number;  
    constructor () {
        this.id = 1;
        this.depositType = "";
        this.depositAmount = 1;
        this.rateOfInterest = 1;
        this.maturityAmount = 1;
        this.tenure = 1;
    }
}