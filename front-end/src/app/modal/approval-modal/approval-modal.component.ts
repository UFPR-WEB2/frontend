import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-approval-modal',
  template: `
    <h1 mat-dialog-title>Confirmação</h1>
    <div mat-dialog-content>
      <p>Você deseja aprovar o serviço com o valor de R$ {{data.precoOrcado}}?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onApprove()">Aprovar</button>
    </div>
  `,
})
export class ApprovalModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ApprovalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { precoOrcado: number }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onApprove(): void {
    this.dialogRef.close(true);
  }
}
