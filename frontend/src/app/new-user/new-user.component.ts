import { Component,  OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';



// Import the AuthService type from the SDK

@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';
  myForm: FormGroup;
  baseUrl = environment.baseUrl;
  id;
  
  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient) {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', [Validators.required, Validators.min(18)])
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
    this.http.get(this.baseUrl + 'user/' + this.id).subscribe((data:any) => {
      this.setData(data);
    })
    }


    
  }
  ngOnInit(): void {}

  onSubmit() {
    if(this.id){
      this.http.patch(this.baseUrl + 'user/' + this.id,this.myForm.value).subscribe((data:any) => {
        this.router.navigateByUrl('/');

      })
    }
    else{
      this.http.post(this.baseUrl + 'user',this.myForm.value).subscribe((data:any) => {
        this.router.navigateByUrl('/');

      })

    }
  }

  setData(data:any) {
    this.myForm.patchValue({
      name: data.name,
      email: data.email,
      age: data.age
    });

  }


  Cancel(){
    this.router.navigateByUrl('/');
  }

}
