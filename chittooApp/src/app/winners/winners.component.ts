import { Component, OnInit } from '@angular/core';
import { Database,ref,set,update,onValue } from '@angular/fire/database';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {
  entries:any
  dataSource:any
  usersList:any=[]
  displayedColumns: any = ['name', 'age',"score"];
  
  constructor(private database:Database) { }

  ngOnInit(): void {
    this.getdata()
   console.log(this.dataSource)
  }
  getdata(){

    // const name="tingu"
    // set(ref(this.database, `winners/${name}`), {
    //   username: name,
    //   age:20,
    //   score:95
    // });
    const getUsers = ref(this.database, 'winners');
    onValue(getUsers,(snapshot)=>{
      this.usersList.push(snapshot.val())
      let temp
      this.entries = Object.values(snapshot.val());
    
     
      temp= this.entries.filter((ele:any)=>ele.age<=21)
      this.dataSource=new MatTableDataSource(temp)
    })
    
  
  }
}
