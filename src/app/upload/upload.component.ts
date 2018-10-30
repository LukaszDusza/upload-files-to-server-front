import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private http: HttpClient) { }

  fileList = new Array<MyFile>();
  selectedFile: File = null;
  progress: number = 0;
  showBar: boolean = false;
  showResult: boolean = false;
  result: String = null;

  host = "http://77.55.219.133:8080/demo/files/";
  localhost = "http://localhost:8080/files/";

  ngOnInit() {
    this.showFiles();
   }

  onUpload() {
    const formData = new FormData();
    formData.append("file", this.selectedFile, this.selectedFile.name)
    this.http.post<Message>(this.localhost + "upload", formData, { reportProgress: true, observe: "events" }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.showBar = true;
        this.progress = Math.round((event.loaded / event.total) * 100) ;
        console.log([event.loaded, event.total]);
      } else if (event.type === HttpEventType.Response) {
        this.showResult = true;
        this.result = event.body.status;
        console.log(event);
      }
    }, err => {console.log(err)}, () => {
      this.showFiles();
    })
  }

  onSelected(event) {
    this.showResult = false;
    this.showBar = false;
    console.log(event);
    this.selectedFile = <File>event.target.files[0];

  }

  onDelete(file: string) {   
  let params = new HttpParams().append("name", file);   
  console.log(params);
  this.http.post<Message>(this.localhost + "delete", params).subscribe( message => {
    console.log(message);
  }, err => {console.log(err)}, () => {
    this.showFiles();
  })
  }

  showFiles() {
    this.fileList = [];
    this.http.get<Array<MyFile>>(this.localhost + "list").subscribe(files => {
      files.map( f=> {
        this.fileList.push(f);
      })
    });    
         
  }

  
}

export interface Message {
  status: String;
  path: String;
}

export interface MyFile {
  title: String;
  path: String;
}

