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
        this.depositAmount = null;
        this.rateOfInterest = null;
        this.maturityAmount = null;
        this.tenure = null;
    }
}