import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Page404Component } from './page404.component';

describe('Page404Component', () => {
  let component: Page404Component;
  let fixture: ComponentFixture<Page404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page404Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Page404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
