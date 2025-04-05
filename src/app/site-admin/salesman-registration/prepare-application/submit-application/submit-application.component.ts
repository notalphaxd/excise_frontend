import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { SiteAdminService } from '../../../site-admin-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-application',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './submit-application.component.html',
  styleUrl: './submit-application.component.scss'
})
export class SubmitApplicationComponent {
  @Output() back = new EventEmitter<void>();

  private siteAdminService = inject(SiteAdminService);
  private router = inject(Router);

  get licenseDetails() {
    return this.getGroupedEntries('licenseDetails');
  }

  get personDetails() {
    return this.getGroupedEntries('personDetails');
  }

  get uploadedDocuments() {
    const storedDocs = sessionStorage.getItem('uploadedDocuments');
    if (!storedDocs) return [];

    try {
      const parsedDocs = JSON.parse(storedDocs);
      return Object.entries(parsedDocs).map(([key, fileObj]: [string, any]) => ({
        key,
        name: fileObj.name,
        type: fileObj.type,
        size: fileObj.size,
        fileUrl: fileObj.fileUrl || '',
        file: fileObj.file
      }));
    } catch (error) {
      console.error("Error parsing uploadedDocuments:", error);
      return [];
    }
  }

  get modeofOperation() {
    const storedData = sessionStorage.getItem('licenseDetails');
    return storedData ? JSON.parse(storedData).modeofOperation : null;
  }

  private getGroupedEntries(groupKey: string) {
    const storedData = sessionStorage.getItem(groupKey);
    if (!storedData) return [];

    try {
      const parsedData = JSON.parse(storedData);
      return Object.keys(parsedData).map(key => ({
        key: this.formatKey(key),
        value: parsedData[key]
      }));
    } catch (error) {
      console.error(`Error parsing sessionStorage key "${groupKey}":`, error);
      return [];
    }
  }

  private formatKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
  }

  async submit() {
    const licenseDetails = JSON.parse(sessionStorage.getItem('licenseDetails') || '{}');
    const personDetails = JSON.parse(sessionStorage.getItem('personDetails') || '{}');
    const uploadedDocuments = this.uploadedDocuments;

    const documents: { [key: string]: string } = {};

    for (const doc of uploadedDocuments) {
      if (doc.file) {
        const base64 = await this.convertToBase64(doc.file);
        documents[doc.key] = base64;
      }
    }

    const requestData = {
      ...licenseDetails,
      ...personDetails,
      ...documents
    };

    this.siteAdminService.createSalesmanBarman(requestData).subscribe({
      next: () => {
        alert('Application submitted successfully!');
        sessionStorage.clear();
        this.router.navigate(['/site-admin/salesman-barman']);
      },
      error: (err) => {
        console.error('Submission failed:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  goBack() {
    this.back.emit();
  }
}
