import { ComponentFixture, TestBed } from '@angular/core/testing';
import { list_page } from './list-page';

describe('ListPageComponent', () => {
  let component: list_page;
  let fixture: ComponentFixture<list_page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [list_page]
    }).compileComponents();

    fixture = TestBed.createComponent(list_page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
