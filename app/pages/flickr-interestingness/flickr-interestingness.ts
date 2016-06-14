import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FlickrService} from '../../services/flickr.service';
import {PhotosResponse} from '../../models/photos-response'

/*
  Generated class for the FlickrInterestingnessPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/flickr-interestingness/flickr-interestingness.html',
    providers: [FlickrService]
})
export class FlickrInterestingnessPage {

    photosResponse: PhotosResponse;

    constructor(public nav: NavController, private flickrService: FlickrService) { }

    fillData(): boolean {
        return this.photosResponse ? true : false;
    }

    loadInterestigness() {
        this.flickrService.getInterestingness()
            .subscribe(data => {
                this.photosResponse = data;

                console.log(`this.photosResponse ${this.photosResponse}`);
                console.log(this.photosResponse);
                console.log(`this.photosResponse.photos ${this.photosResponse.photos}`);
                console.log(this.photosResponse.photos);
                console.log(`this.photosResponse.photos.page ${this.photosResponse.photos.page}`);
                console.log(`this.photosResponse.stat ${this.photosResponse.stat}`);


            }
            );
    }
}
