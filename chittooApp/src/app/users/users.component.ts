import { Component, OnInit,  } from '@angular/core';
import { Database,ref,set,update,onValue } from '@angular/fire/database';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
  entries:any
  dataSource=new MatTableDataSource()
  displayedColumns: any = ['name', 'age',"score","button"];
  
  constructor(private database:Database) {}

  ngOnInit(): void {
   this.getdata()
   
  this.dataSource.filterPredicate =  function (data,filter) {
    console.log("filter",filter)
    const temp=JSON.stringify(data)
    if(!temp.includes(`"score":${filter}`)){
      return false //if false is written then that data is removed from dataSource
    }
    return true;
  }
   
  }

  getdata(){

    // const name="farhan"
    // set(ref(this.database,`users/${name}`),{
    //   username:name,
    //   age:16,
    //   score:99
    // })
  
    const getUsers=ref(this.database,"users");
    let temp,toppersData
     onValue(getUsers,(snapshot)=>{
      temp=snapshot.val()
      
      temp=Object.values(snapshot.val())
      temp=temp.filter((ele:any)=>ele.age<=21)
      
      this.dataSource.data= temp
       toppersData=temp.filter((ele:any)=>ele.score>=90)
 
       toppersData.forEach((ele:any)=>{
          let name=ele.username
          set(ref(this.database,`toppers/${name}`),{
            username:name,
            age:ele.age,
            score:ele.score
          })
       })
    }) 
    
  
  }

  


  addToWinners(user:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, do it!',
      cancelButtonText: 'No, cancel!',
      
    }).then((result)=>{
      if(result.value){
        const name=user.username
        set(ref(this.database, `winners/${name}`), {
          username: name,
          age:user.age,
          score:user.score
        });
      }
    })
    
  }
  
 
  onInputChange(event:any){
    let filter=event.target.value
    console.log(event.target.value)
    let temp=this.dataSource
   
    this.dataSource.filter=filter
    console.log(this.dataSource)

  }

}

function ele(ele: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}
