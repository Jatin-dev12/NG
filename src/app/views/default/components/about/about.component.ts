import { Component, OnInit } from '@angular/core';
import { Enums } from 'src/app/enums';
import { GlobalService } from 'src/app/services';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class AboutComponent implements OnInit {

    Enums = Enums;

    constructor(
        public gs: GlobalService,
    ) { }

    ngOnInit(): void {
        //throw new Error("Signup event cannot be called while doing server side rendering");
        /*
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS5hbWxha3NlcnYuY29tIiwiZWF0IjoxNjkyMzUwNTM0LCJpYXQiOjE2OTIzNDg1MzQsImlkIjozLCJpc3MiOiJodHRwczovL2FwaS5hbWxha3NlcnYuY29tIiwibmJmIjoxNjkyMzQ4NTM0fQ.CAYBsMxqxsSOzhZvonWpLgmAxX2zOflgDfx4t6poNJY");

        var raw = "";

        var requestOptions: any = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://go.amlakserv.com/catalog/index?key=tag-types&page=off", requestOptions)
            .then(response => response.text())
            .then(result => console.log('result', result))
            .catch(error => console.log('error', error));
        */
    }

}
