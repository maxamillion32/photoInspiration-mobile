import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {FlickrService} from '../../services/flickr.service';
import {PhotosResponse} from '../../models/photos-response'
import {Photo} from '../../models/photo'
import {FlickrError} from '../../models/flickr-error'
import {FlickrPhotoPage} from '../flickr-photo/flickr-photo';
import {PhotoFilterPage} from '../photo-filter/photo-filter';
import {PhotoFilter} from '../../models/photo-filter';

/*
  Generated class for the FlickrInterestingnessPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/flickr-interestingness/flickr-interestingness.html'
})
export class FlickrInterestingnessPage {
    photoFilter: PhotoFilter = new PhotoFilter();
    photosResponse: PhotosResponse;
    page: number = 1;
    flickrError: FlickrError;

    constructor(public nav: NavController, private flickrService: FlickrService) { }

    fillData(): boolean {
        return this.photosResponse ? true : false;
    }
    onPageLoaded() {
        this.loadInterestigness(null);
    }
    goToPhotoPage(photo: Photo) {
        this.nav.push(FlickrPhotoPage, photo);
    }

    showError() {
        if ((!this.photosResponse) && (this.flickrError)) {
            return true;
        }
        return false;
    }
    presentFilter() {
        let modal = Modal.create(PhotoFilterPage, this.photoFilter);
        this.nav.present(modal);

        modal.onDismiss((data: PhotoFilter) => {
            if (data) {
                console.log('aplica objto', data);
                this.photoFilter = data;
                this.loadInterestigness(null);
            }
        });
    }

    loadInterestigness(infiniteScroll) {

        if ((this.photosResponse) && ((this.page - 1) === this.photosResponse.photos.pages)) {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            return;
        }
        this.flickrService.getInterestingness(this.page, this.photosResponse, this.photoFilter)
            .subscribe(data => {

                this.page = this.page + 1;
                this.photosResponse = data;
                //
                // console.log(`this.photosResponse ${this.photosResponse}`);
                // console.log(this.photosResponse);
                // console.log(`this.photosResponse.photos ${this.photosResponse.photos}`);
                console.log(this.photosResponse.photos);
                // console.log(`this.photosResponse.photos.page ${this.photosResponse.photos.page}`);
                // console.log(`this.photosResponse.stat ${this.photosResponse.stat}`);

                if (infiniteScroll) {
                    infiniteScroll.complete();
                }

            },
            error => {
                console.log(error);
                this.flickrError = error;
                this.photosResponse = null;
            }
            );
    }
}
