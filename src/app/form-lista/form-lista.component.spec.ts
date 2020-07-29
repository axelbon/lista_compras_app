import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormListaComponent } from './form-lista.component';

describe('FormListaComponent', () => {
  let component: FormListaComponent;
  let fixture: ComponentFixture<FormListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormListaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
