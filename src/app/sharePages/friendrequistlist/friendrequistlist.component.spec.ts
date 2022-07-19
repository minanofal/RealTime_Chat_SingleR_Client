import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendrequistlistComponent } from './friendrequistlist.component';

describe('FriendrequistlistComponent', () => {
  let component: FriendrequistlistComponent;
  let fixture: ComponentFixture<FriendrequistlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendrequistlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendrequistlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
