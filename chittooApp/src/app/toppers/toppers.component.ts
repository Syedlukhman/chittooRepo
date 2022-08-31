import { Component, OnInit } from '@angular/core';
import { Database,set,ref,update,onValue } from '@angular/fire/database';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.css']
})
export class ToppersComponent implements OnInit {
dataSource=new MatTableDataSource()
displayedColumns=["name","age","score"]
  entries:any;
  constructor(private database:Database) { }

  ngOnInit(): void {
    this.getdata()

  }

  getdata(){
    const getUsers = ref(this.database, 'toppers');
    onValue(getUsers,(snapshot)=>{
    let temp
    this.entries = Object.values(snapshot.val());
    temp= this.entries.filter((ele:any)=>ele.age<=21)
    this.dataSource.data=temp
    console.log(this.dataSource.data)
    })
    
  
  }
}
