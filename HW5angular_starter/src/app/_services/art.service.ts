
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Art } from '../_models/art';
import { User } from '../_models/user';



@Injectable({ providedIn: 'root' })
export class ArtService {
    constructor(private http: HttpClient) { }

    getAll() {
        console.log('getAll()');
        return this.http.get<Art[]>(`http://localhost:4000/art/getarts`);
    }



    //TODO: notice this new function.
    getEnrolledusers(artID: string) {
        console.log("The returning values are " +this.http.get<any>(`http://localhost:4000/art/getusers${artID}`));
        return this.http.get<any>(`http://localhost:4000/art/getusers${artID}`);
    }


    delete(id: string) {
        return this.http.delete(`http://localhost:4000/art/${id}`);

    }
    getPicture(artID: string) {
      
       
        console.log("We are wanting a picture, the art id is " + artID);
        return this.http.get<any>(`http://localhost:4000/art/getPicture${artID}`);
    }
    favorite(artID: string) {
      
        console.log("HIIIIIIII");
        let obj = 
        {
           "artID": artID,
        };
        //console.log("We are wanting a picture, the art id is " + artID);
        return this.http.post(`http://localhost:4000/art/favorite`, obj);

    }
    unfavorite(artID: string) {
        let obj = 
        {
           "artID": artID,
        };
       
        //console.log("We are wanting a picture, the art id is " + artID);
        return this.http.post(`http://localhost:4000/art/unfavorite`, obj);
    }
    like(artID: string, total: number) {

        let obj = 
        {
           "artID": artID,
           "value": total,
        };
       
        //console.log("We are wanting a picture, the art id is " + artID);
        return this.http.post(`http://localhost:4000/art/like`, obj);
    }
    unlike(artID: string, total: number) {
        let obj = 
        {
           "artID": artID,
           "value": total,

        };
       
        //console.log("We are wanting a picture, the art id is " + artID);
        return this.http.post(`http://localhost:4000/art/unlike`, obj);
    }
    
    getArtist(artist: string) {
      
       
        console.log("We are wanting the artists collection " + artist);
        return this.http.get<any>(`http://localhost:4000/art/getArtistPictures${artist}`);
    }
    //TODO-Done?: make a post request that will send the art object to the back end.
    createArt(art: Art) {
        console.log("hello world");
        art.tags = art.tagList.split(",");
        console.log("hello world," , art.tags);

        art.imageLink = "assets/" + art.imageLink;
        return this.http.post(`http://localhost:4000/art/addart`, art);
    }
    editArt(art: Art, id: string) {
        console.log("hello world");
        art.tags = art.tagList.split(",");
        console.log("hello world," , art.tags);
        art._id = id;
        console.log("hello world," , art._id);

        art.imageLink = "assets/" + art.imageLink;
        return this.http.post(`http://localhost:4000/art/edit`, art);
    }

}
