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
        this.depositAmount = 0;
        this.rateOfInterest = 0;
        this.maturityAmount = 0;
        this.tenure = 0;
    }
}