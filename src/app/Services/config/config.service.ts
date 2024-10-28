import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {resolve} from '@angular/compiler-cli';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http.get('assets/config.json', this.httpOptions)
      .toPromise()
      .then(data => {
        this.config = data;
      });
  }


  get apiUrl(){
    if (!this.config) {
      throw Error('Config file not loaded!');
    }
    return this.config.apiUrl;
  }
}
