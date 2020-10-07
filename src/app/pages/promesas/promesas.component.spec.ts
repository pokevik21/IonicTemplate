import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromesasComponent } from './promesas.component';

describe('PromesasComponent', () => {
  let component: PromesasComponent;
  let fixture: ComponentFixture<PromesasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromesasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
