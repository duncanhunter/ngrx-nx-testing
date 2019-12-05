import { async, TestBed } from '@angular/core/testing';
import { NgrxDemoAuthFeatureLoginModule } from './ngrx-demo-auth-feature-login.module';

describe('NgrxDemoAuthFeatureLoginModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgrxDemoAuthFeatureLoginModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgrxDemoAuthFeatureLoginModule).toBeDefined();
  });
});
