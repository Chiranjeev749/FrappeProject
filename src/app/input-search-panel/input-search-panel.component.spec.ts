import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchPanelComponent } from './input-search-panel.component';

describe('InputSearchPanelComponent', () => {
  let component: InputSearchPanelComponent;
  let fixture: ComponentFixture<InputSearchPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputSearchPanelComponent]
    });
    fixture = TestBed.createComponent(InputSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
