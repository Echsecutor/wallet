import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ResultScan, ScannerService } from './scanner.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from 'ng-flex-layout';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  IssuanceRequestComponent,
  VerifyRequestComponent,
} from '@my-wallet/holder-shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scanner',
  standalone: true,
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.scss',
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    IssuanceRequestComponent,
    VerifyRequestComponent,
  ],
})
export class ScannerComponent implements OnInit {
  urlField!: FormControl;

  action?: 'issue' | 'verify' | undefined;
  url?: string;

  constructor(
    public scanner: ScannerService,
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.url = id;
      this.action = id.startsWith('openid-credential-offer://')
        ? 'issue'
        : 'verify';
    }
    this.scanner.results = [];
    this.urlField = new FormControl('');
    this.urlField.valueChanges.subscribe((value) => {
      if (
        value.startsWith('openid-credential-offer://') ||
        value.startsWith('openid://')
      ) {
        this.scanner.results = [];
        this.scanner.parse(value);
      }
    });
  }
  process(result: ResultScan) {
    this.url = result.url;
    if (result.action === 'issue') {
      this.action = 'issue';
    } else {
      this.action = 'verify';
    }
  }
}
