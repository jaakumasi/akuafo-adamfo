import { Component, forwardRef, inject, input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  private readonly formBuilder = inject(FormBuilder);

  public initialValue = input<string>('');
  public placeholder = input<string>('');
  public inputType = input<'text' | 'password' | 'numeric'>('text');
  public label = input('');
  public inputId = input(Math.random());
  public icon = input('');
  public invalidInputMessage = input('');

  protected formControl!: FormControl;
  
  private formControlSubscription?: Subscription;

  ngOnInit(): void {
    this.formControl = this.formBuilder.control(this.initialValue());

    this.formControlSubscription = this.formControl.valueChanges.subscribe(
      (value) => {
        this.onChange(value);
      }
    );
  }

  onChange = (value: string) => {};

  onInputTouched() {}

  writeValue(value: string): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onInputTouched = fn;
  }
}
