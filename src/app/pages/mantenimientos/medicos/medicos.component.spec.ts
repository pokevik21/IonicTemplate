import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicosComponent } from './medicos.component';

describe('MedicosComponent', () => {
  let component: MedicosComponent;
  let fixture: ComponentFixture<MedicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
