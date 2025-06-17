import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCoins } from './crypto-coins';

describe('CryptoCoins', () => {
  let component: CryptoCoins;
  let fixture: ComponentFixture<CryptoCoins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoCoins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoCoins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
