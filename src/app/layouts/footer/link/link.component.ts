import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute } from '@angular/router';


export interface Headquarter {
  officerName: string;
  designation: string;
  address: string;
  phoneNumber: number;
}

const HEADQUARTER_DATA: Headquarter[] = [
  {officerName: 'Mrs. Samten Dolma Bhutia', designation: 'S.P.I.O.- Additional Secretary (Administration)', address: 'Excise Department , Mg Marg, Gangtok', phoneNumber: 3592203963},
  {officerName: 'Mr Namgyal Dorjee Bhutia', designation: 'A.P.I.O - Joint Commissioner(HQ)', address: 'Excise Department , Mg Marg, Gangtok', phoneNumber: 3592203963},
  {officerName: 'Mrs Sushma Pradhan', designation: 'A.P.I.O - Deputy Secretary (Adminstration)', address: 'Excise Department , Mg Marg, Gangtok', phoneNumber: 3592203963},
  {officerName: 'Mrs. Dil Maya Subba', designation: 'A.P.I.O - Sr. Accounts Officer (Accounts)', address: 'Excise Department , Mg Marg, Gangtok', phoneNumber: 3592203963},
  {officerName: 'Mr. Wangchuk Pakhrin', designation: 'A.P.I.O - Assistant Commissioner (Field)', address: 'Excise Department , Mg Marg, Gangtok', phoneNumber: 3592203963}
]

@Component({
  selector: 'app-link',
  standalone:true,
  imports: [
    MaterialModule
  ],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent implements OnInit {
  //links logic
  selectedTab=0
  page: string | null= '';
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.page = params.get('page');
    });
  }

  displayedColumns: string[] = ['officerName', 'designation', 'address', 'phoneNumber'];
  dataSource = HEADQUARTER_DATA;
  constructor(private route: ActivatedRoute) {}




}

