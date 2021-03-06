import { BackRoutingService } from './../services/back-routing.service';
import { PhaseFilterComponent } from './phase-filter/phase-filter.component';
import { TypeFilterComponent } from './type-filter/type-filter.component';
import { MapComponent } from './map/map.component';
import { Component, OnInit, Inject, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMModel } from 'app/Models/EMModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmdataService } from '@core/network/services/emdata.service';
import { EfficiencyMetricNeighbourModel } from 'app/Models/EfficiencyMetricNeighbourModel';
import { RanksFilterComponent } from './ranks-filter/ranks-filter.component';
import { OfstedFilterComponent } from './ofsted-filter/ofsted-filter.component';
import { ReligionFilterComponent } from './religion-filter/religion-filter.component';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { TitleService } from 'app/services/title.service';
import { SessionService } from 'app/services/session.service';

@Component({
  selector: 'app-manual-comparison',
  templateUrl: './manual-comparison.component.html',
  styleUrls: ['./manual-comparison.component.scss']
})
export class ManualComparisonComponent implements OnInit, AfterViewInit {

  @ViewChild('basketFullModal')
  private basketFullModal: TemplateRef<any>;

  @ViewChild(RanksFilterComponent)
  private ranksFilter: RanksFilterComponent;

  @ViewChild(OfstedFilterComponent)
  private ofstedFilter: OfstedFilterComponent;

  @ViewChild(ReligionFilterComponent)
  private religionFilter: ReligionFilterComponent;

  @ViewChild(TypeFilterComponent)
  private typeFilter: TypeFilterComponent;

  @ViewChild(PhaseFilterComponent)
  private phaseFilter: PhaseFilterComponent;

  @ViewChild(MapComponent)
  private map: MapComponent;

  urn: number;
  name: string;
  model: EMModel = new EMModel();
  modalRef: BsModalRef;
  selectedSchoolUrns: Array<number>;
  sort: string = 'AlphabeticalAZ';
  visibleSchoolList: Array<EfficiencyMetricNeighbourModel> = [];
  resultSectionState: string = 'list-view';

  constructor(
    private route: ActivatedRoute,
                    @Inject(appSettings) public settings: AppSettings,
                    private modalService: BsModalService,
                    private emDataService: EmdataService,
                    titleService: TitleService,
                    backRoutingService: BackRoutingService,
                    private sessionService: SessionService) {

    titleService.setWithPrefix("Manual comparison");
    this.route.paramMap.subscribe(pmap => {
        this.urn = +pmap.get('urn');
        this.name = pmap.get('name');
        backRoutingService.setPreviousUrl(`/efficiency-metric/comparison-type/${this.urn}/${this.name}`)
      });
    this.loadSelectionFromSession();
  }

  ngAfterViewInit(): void {
      this.religionFilter?.buildReligionFiltersFromDataModel(this.visibleSchoolList);
      this.typeFilter?.buildTypeFiltersFromDataModel(this.visibleSchoolList);
      this.phaseFilter?.buildPhaseFiltersFromDataModel(this.visibleSchoolList);
  }

  ngOnInit() {
    this.emDataService.getEmData(this.urn).
      subscribe(result => {
        this.model = result;
        this.model.neighbourDataModels = this.model.neighbourDataModels.filter(n => n.urn !== this.urn);
        this.visibleSchoolList = Array.from(this.model.neighbourDataModels);
        this.religionFilter?.buildReligionFiltersFromDataModel(this.visibleSchoolList);
        this.typeFilter?.buildTypeFiltersFromDataModel(this.visibleSchoolList);
        this.phaseFilter?.buildPhaseFiltersFromDataModel(this.visibleSchoolList);
        this.sortSchools();
      });
  }



  sortSchools() {
    this.visibleSchoolList = this.visibleSchoolList.sort((n1, n2) => this.sortByName(n1.name, n2.name));
  }

  onResultSectionStateToggle() {
    this.resultSectionState = this.resultSectionState === 'list-view' ? 'map-view' : 'list-view';
    if (this.resultSectionState === 'map-view') {
      this.map.bindAzureMap();
    }
  }

  addRemoveFromMapPopup(urn: number) {
    if (this.selectedSchoolUrns.includes(urn)) {
      this.removeFromManualBasket(urn);
    } else {
      this.addToManualBasket(urn);
    }
  }

  addToManualBasket(urn: number) {
    if (this.selectedSchoolUrns.length < 30) {
      this.selectedSchoolUrns.push(urn);
      this.storeSelectionInSession();
    } else {
      this.openModal(this.basketFullModal);
    }
  }

  removeFromManualBasket(urn) {
    this.selectedSchoolUrns = this.selectedSchoolUrns.filter(s => s !== urn);
    this.storeSelectionInSession();
  }

  storeSelectionInSession(){
    this.sessionService.storeSelectionInSession(this.selectedSchoolUrns);
  }

  loadSelectionFromSession(){
    this.selectedSchoolUrns = this.sessionService.loadSelectionFromSession();
  }

  filterResults() {
    this.visibleSchoolList = this.model.neighbourDataModels
      .filter(n => this.ranksFilter.isFiltered(n.rank))
      .filter(n => this.ofstedFilter.isFiltered(n.ofstedRating))
      .filter(n => this.typeFilter.isFiltered(n.schoolType))
      .filter(n => this.phaseFilter.isFiltered(n.phase))
      .filter(n => this.religionFilter.isFiltered(n.religiousCharacter));

    this.sortSchools();
  }

  private sortByName(name1: string, name2: string) {
    if (this.sort === 'AlphabeticalAZ') {
      return name1.toUpperCase() > name2.toUpperCase() ? 1 : -1;
    } else {
      return name1.toUpperCase() > name2.toUpperCase() ? -1 : 1;
    }
  }

  private openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { animated: false, class: 'sfb-modal-dialog' });
  }
}


