import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';

@Component({
  selector: 'app-usocamara',
  templateUrl: './usocamara.page.html',
  styleUrls: ['./usocamara.page.scss'],
})
export class UsocamaraPage implements OnInit {

  imageSource: any;

  constructor() { }

  ngOnInit() {
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });
    this.imageSource=image.dataUrl;
  };

}
