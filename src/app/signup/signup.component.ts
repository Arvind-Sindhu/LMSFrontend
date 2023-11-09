import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email:string='';
  password:string='';
  supabase = createClient('https://yhkctgnpvatkfksecxsr.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloa2N0Z25wdmF0a2Zrc2VjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNDE3NjksImV4cCI6MjAxNDkxNzc2OX0.COQA5pDCc1hwy1EvmkYvKUuddbN8n0cblrpJCZX2VKg')
 
  constructor( private router: Router) {}
  
  async signUp(){
    debugger;
    
const { data, error } = await this.supabase.auth.signUp({
  email:this.email,
  password: this.password
})
alert("signup sucessfull")
    this.router.navigate(['/login']);
  }
  

}

