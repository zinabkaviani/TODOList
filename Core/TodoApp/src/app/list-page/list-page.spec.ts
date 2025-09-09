import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPgee } from './list-pgee';

describe('ListPgee', () => {
  let component: ListPgee;
  let fixture: ComponentFixture<ListPgee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPgee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPgee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
