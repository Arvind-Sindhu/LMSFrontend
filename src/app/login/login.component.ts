import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  supabase = createClient('https://yhkctgnpvatkfksecxsr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloa2N0Z25wdmF0a2Zrc2VjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNDE3NjksImV4cCI6MjAxNDkxNzc2OX0.COQA5pDCc1hwy1EvmkYvKUuddbN8n0cblrpJCZX2VKg');

  constructor(private router: Router) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        const { data, error } = await this.supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) {
          console.error('Supabase login error:', error);
          return;
        } else if (data) {
          // Fetch user data from the Supabase table based on the provided email
          const { data, error: fetchError } = await this.supabase
            .from('usertable')
            .select('id, username') // Include the 'username' column in the select statement
            .eq('email', email)
            .single();

          if (fetchError) {
            // Handle fetch error
            console.error('Fetch user data error:', fetchError);
            // Perform error handling (e.g., display an error message to the user)
          } else if (data) {
            const { id, username } = data;
            // Store the username and id in local storage
            localStorage.setItem('id', id);
            localStorage.setItem('username', username);
            console.log('id and username stored in local storage:', id, username);

            // Redirect to a different route or perform other actions upon successful login
            this.router.navigate(['/dashboard'], { queryParams: { id: id } });
            // After successfully storing the username in localStorage
this.router.navigate(['/dashboard'], { queryParams: { username: username } });
// Change '/dashboard' to your desired route
          }
        }
      } catch (error) {
        // Handle other potential errors (e.g., network issues)
        console.error('Unexpected error:', error);
        // Perform error handling (e.g., display an error message to the user)
      }
    }
  }
}
