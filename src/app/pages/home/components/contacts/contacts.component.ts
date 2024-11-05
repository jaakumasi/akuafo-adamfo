import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'contacts',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  protected year = new Date().getFullYear();

  protected handleSendToMail() {
    const a = document.createElement('a');
    a.href = 'mailto:ehanson787@gmail.com?subject=Akuafo%20Adamfo';
    a.click();
  }
}
