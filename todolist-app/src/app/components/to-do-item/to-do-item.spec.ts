import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItem } from './to-do-item';

describe('ToDoItem', () => {
  let component: ToDoItem;
  let fixture: ComponentFixture<ToDoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
