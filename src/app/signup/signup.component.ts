import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Reactive Form
  signupForm: FormGroup;

  // Supabase Client
  supabase = createClient(
    'https://yhkctgnpvatkfksecxsr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloa2N0Z25wdmF0a2Zrc2VjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNDE3NjksImV4cCI6MjAxNDkxNzc2OX0.COQA5pDCc1hwy1EvmkYvKUuddbN8n0cblrpJCZX2VKg'
  );

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }

  async signUp() {
    if (this.signupForm.valid) {
      // Form is valid, proceed with form submission
      const { username, email, password } = this.signupForm.value;

      try {
        // Sign up the user with Supabase
        const signupresult= await this.supabase.auth.signUp({
          email: this.signupForm.value.email,
          password: this.signupForm.value.password
        });

        if (signupresult.error) {
          console.error('Supabase signup error:', signupresult.error);
          return;
        }
         else{ const insertError = await this.supabase
         .from('usertable')
         .insert([
           {
             username,
             email,
             password
           }
         ]);

         
        // Insert user data into 'usertable'
       

        if (insertError.error) {
          console.error('Supabase insert error:', insertError.error);
        }

        // Successful signup
        alert('Signup successful');

        // Redirect to the login page or another appropriate route
        this.router.navigate(['/login']);
      }
      
    } catch (error) {
      console.error('Supabase error:', error);
    }
  
  }}}
