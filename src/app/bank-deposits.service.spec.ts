import { TestBed, inject } from '@angular/core/testing';

import { BankDepositsService } from './bank-deposits.service';

describe('BankDepositsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankDepositsService]
    });
  });

  it('should be created', inject([BankDepositsService], (service: BankDepositsService) => {
    expect(service).toBeTruthy();
  }));
});
