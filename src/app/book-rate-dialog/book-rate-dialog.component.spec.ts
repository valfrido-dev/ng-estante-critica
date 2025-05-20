import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRateDialogComponent } from './book-rate-dialog.component';

describe('BookRateDialogComponent', () => {
  let component: BookRateDialogComponent;
  let fixture: ComponentFixture<BookRateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
