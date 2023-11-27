import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Reactive Form
  signupForm: FormGroup;
  showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

  // Supabase Client
  supabase = createClient(
    'https://yhkctgnpvatkfksecxsr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloa2N0Z25wdmF0a2Zrc2VjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNDE3NjksImV4cCI6MjAxNDkxNzc2OX0.COQA5pDCc1hwy1EvmkYvKUuddbN8n0cblrpJCZX2VKg'
  );

  constructor(private formBuilder: FormBuilder, private router: Router,private toastr: ToastrService) {
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/), // Only alphabets
          Validators.minLength(2),
          Validators.maxLength(35)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
          // Allow both alphabets and numbers, but not only numbers
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[!@#$%^&*()_+|[\]{};:'",.<>?\/\\`~\-])(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+|[\]{};:'",.<>?\/\\`~\-]{8,}$/),
          Validators.pattern(/^\S*$/) // No space allowed
        ]
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

 

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }


  async signUp() {
    const existingUser = await this.supabase
      .from('usertable')
      .select('*')
      .eq('email', this.signupForm.value.email)
      .single();
 
    if (existingUser.data) {
      // User already exists
      this.toastr.error('User with this email already exists');
      return;
    }
    if (this.signupForm.valid) {
      // Form is valid, proceed with form submission
      const { username, email, password } = this.signupForm.value;
  
      // Check if password and confirm password match
      if (password !== this.signupForm.value.confirmPassword) {
        this.toastr.error('Password and Confirm Password do not match.');
        return;
      }
  
      try {
        // Sign up the user with Supabase
        const signupresult = await this.supabase.auth.signUp({
          email: this.signupForm.value.email,
          password: this.signupForm.value.password
        });
  
        if (signupresult.error) {
          console.error('Supabase signup error:', signupresult.error);
          return;
        } else {
          const insertError = await this.supabase
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
  
          this.toastr.success('Verification Sent To Your Email');
  
          // Redirect to the login page or another appropriate route
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error('Supabase error:', error);
      }
    }
  }
  
}
