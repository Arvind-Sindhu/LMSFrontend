import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router, private toastr: ToastrService) {
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
          this.toastr.error('Login failed. Check your credentials.');
        } else if (data) {
          // Fetch user data from the Supabase table based on the provided email
          const { data, error: fetchError } = await this.supabase
            .from('usertable')
            .select('id, username')
            .eq('email', email)
            .single();
  
          if (fetchError) {
            console.error('Fetch user data error:', fetchError);
            this.toastr.error('Login failed. Check your credentials.');
          } else if (data) {
            const { id, username } = data;
            // Store the username and id in local storage
            localStorage.setItem('id', id);
            localStorage.setItem('username', username);
            console.log('id and username stored in local storage:', id, username);
            this.toastr.success('Login successful! Welcome ' + username);
            localStorage.setItem('Token','7889139929abc');
           
            this.router.navigate(['/dashboard'], { queryParams: { id: id, username: username } });
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        this.toastr.error('An unexpected error occurred. Please try again.');
      }
    } else {
      this.toastr.error('Invalid form. Please check your input.');
    }
  }
  
}
