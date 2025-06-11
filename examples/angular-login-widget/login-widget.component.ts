import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.scss']
})
export class LoginWidgetComponent implements OnInit {
  ngOnInit(): void {
    const form = document.getElementById('form1');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validate();
      });
    }
  }

  private validate(): void {
    const userInput = document.getElementById('okta-signin-username') as HTMLInputElement | null;
    const passInput = document.getElementById('okta-signin-password') as HTMLInputElement | null;
    if (!userInput || !passInput) {
      return;
    }

    this.toggleFieldError(
      userInput,
      !userInput.value.trim(),
      'Please enter a username',
      'input-container-error11'
    );

    this.toggleFieldError(
      passInput,
      !passInput.value.trim(),
      'Please enter a password',
      'input-container-error12'
    );
  }

  private toggleFieldError(
    input: HTMLInputElement,
    show: boolean,
    message: string,
    id: string
  ): void {
    const container = input.parentElement as HTMLElement;
    if (!container) {
      return;
    }
    let errorEl = container.querySelector(`#${id}`) as HTMLElement | null;
    if (show) {
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = id;
        errorEl.className = 'okta-form-input-error o-form-input-error o-form-explain';
        errorEl.setAttribute('role', 'alert');
        errorEl.innerHTML = `<span class="icon icon-16 error-16-small" role="img" aria-label="Error"></span>${message}`;
        container.appendChild(errorEl);
      }
      errorEl.style.display = 'block';
      container.classList.add('o-form-has-errors');
    } else if (errorEl) {
      errorEl.style.display = 'none';
      container.classList.remove('o-form-has-errors');
    }
  }
}
