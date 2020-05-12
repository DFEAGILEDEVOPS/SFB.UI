import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { HowItIsCalculatedComponent } from './how-it-is-calculated/how-it-is-calculated.component';
import { MapComponent } from './manual-comparison/map/map.component';
import { ReligionFilterComponent } from './manual-comparison/religion-filter/religion-filter.component';
import { OfstedFilterComponent } from './manual-comparison/ofsted-filter/ofsted-filter.component';
import { RanksFilterComponent } from './manual-comparison/ranks-filter/ranks-filter.component';
import { McBreadCrumbComponent } from './manual-comparison/mc-bread-crumb/mc-bread-crumb.component';
import { ManualComparisonComponent } from './manual-comparison/manual-comparison.component';
import { FormsModule } from '@angular/forms';
import { CtBreadCrumbComponent } from './comparison-type/ct-bread-crumb/ct-bread-crumb.component';
import { ComparisonTypeComponent } from './comparison-type/comparison-type.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { MetricBreadcrumbComponent as MetricBreadcrumbComponent } from './metric/metric-bread-crumb/metric-bread-crumb.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { GovUkLayoutModule } from '@layouts/gov-uk-layout/gov-uk-layout.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmTableComponent } from './metric/em-table/em-table.component';
import { WaysToImproveComponent } from './ways-to-improve/ways-to-improve.component';
import { MetricComponent } from './metric/metric.component';
import { GovUkLayoutComponent } from '@layouts/gov-uk-layout/gov-uk-layout.component';
import { HiwBreadCrumbComponent } from './how-it-works/hiw-bread-crumb/hiw-bread-crumb.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    GovUkLayoutComponent,
    MetricComponent,
    MetricBreadcrumbComponent,
    WaysToImproveComponent,
    EmTableComponent,
    HowItWorksComponent,
    HiwBreadCrumbComponent,
    ComparisonTypeComponent,
    CtBreadCrumbComponent,
    ManualComparisonComponent,
    McBreadCrumbComponent,
    RanksFilterComponent,
    OfstedFilterComponent,
    ReligionFilterComponent,
    MapComponent,
    HowItIsCalculatedComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgBootstrapFormValidationModule.forRoot(),
    CoreModule.forRoot(),
    GovUkLayoutModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
