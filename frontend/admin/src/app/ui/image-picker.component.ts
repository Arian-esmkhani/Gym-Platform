import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="min-w-[20vw] w-[25.4vw]">
      <!-- Preview Section -->
      @if (selectedImageUrl) {
        <div class="mb-6 relative group">
          <!-- Golden Frame Effect -->
          <div class="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-[2.5rem] blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

          <!-- Image Container -->
          <div class="relative bg-gradient-to-br from-gray-900 to-zinc-800 rounded-[2rem] border-2 border-amber-500/30 p-1">
            <img
              [src]="selectedImageUrl"
              alt="Preview"
              class="w-full h-52 object-cover rounded-[1.8rem] border border-amber-400/20 shadow-lg shadow-amber-900/20"
            />

            <!-- Golden Overlay Gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-transparent rounded-[1.8rem] pointer-events-none"></div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 flex justify-center gap-3">
            <app-button
              variant="secondary"
              size="sm"
              (onClick)="removeImage()"
              class="bg-gradient-to-r from-amber-700/20 to-yellow-700/20 border border-amber-600/30 text-amber-200 hover:from-amber-600/30 hover:to-yellow-600/30 hover:border-amber-500/40 transition-all duration-200 shadow-md shadow-amber-900/10"
            >
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </span>
            </app-button>

            <app-button
              variant="primary"
              size="sm"
              (onClick)="triggerFileInput()"
              class="bg-gradient-to-r from-amber-500 to-yellow-500 border border-amber-400 text-gray-900 font-semibold hover:from-amber-400 hover:to-yellow-400 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-200 shadow-md shadow-amber-900/20"
            >
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Change
              </span>
            </app-button>
          </div>
        </div>
      }

      <!-- Upload Button (When no image) -->
      @if (!selectedImageUrl) {
        <div class="relative group">
          <!-- Golden Glow Effect -->
          <div class="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-all duration-500"></div>

          <app-button
            variant="primary"
            size="lg"
            (onClick)="triggerFileInput()"
            class="relative w-full bg-gradient-to-r from-amber-500 to-yellow-500 border-2 border-amber-400/50 text-gray-900 font-bold hover:from-amber-400 hover:to-yellow-400 hover:border-amber-300/60 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-900/30"
          >
            <span class="flex items-center justify-center gap-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Select Image
            </span>
          </app-button>
        </div>
      }

      <!-- Hidden File Input -->
      <input
        #fileInput
        type="file"
        (change)="onFileSelected($event)"
        accept="image/*"
        class="hidden"
      />
    </div>
  `
})
export class ImagePickerComponent {
  @Output() imageSelected = new EventEmitter<string>();

  selectedImageUrl: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageUrl = e.target?.result as string;
        this.imageSelected.emit(this.selectedImageUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedImageUrl = null;
    this.imageSelected.emit('');
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  reset(): void {
    this.selectedImageUrl = null;
    this.imageSelected.emit('');
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
