import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-gif-picker',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="min-w-[20vw] w-[25.4vw]">
      <!-- Preview Section -->
      @if (selectedGifUrl) {
        <div class="mb-6 relative group">
          <!-- Golden Frame Effect -->
          <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-[2.5rem] blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

          <!-- GIF Container -->
          <div class="relative bg-gradient-to-br from-gray-900 to-zinc-800 rounded-[2rem] border-2 border-emerald-500/30 p-1">
            <!-- GIF Image -->
            <img
              [src]="selectedGifUrl"
              alt="GIF Preview"
              class="w-full h-52 object-cover rounded-[1.8rem] border border-emerald-400/20 shadow-lg shadow-emerald-900/20"
            />

            <!-- GIF Badge -->
            <div class="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 backdrop-blur-sm border border-emerald-400/30 text-xs font-bold text-white shadow-lg animate-pulse">
              GIF
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 flex justify-center gap-3">
            <app-button
              variant="secondary"
              size="sm"
              (onClick)="removeGif()"
              class="bg-gradient-to-r from-emerald-700/20 to-teal-700/20 border border-emerald-600/30 text-emerald-200 hover:from-emerald-600/30 hover:to-teal-600/30 hover:border-emerald-500/40 transition-all duration-200 shadow-md shadow-emerald-900/10"
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
              class="bg-gradient-to-r from-emerald-500 to-teal-500 border border-emerald-400 text-gray-900 font-semibold hover:from-emerald-400 hover:to-teal-400 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 shadow-md shadow-emerald-900/20"
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

      <!-- Upload Button (When no GIF) -->
      @if (!selectedGifUrl) {
        <div class="relative group">
          <!-- Animated Gradient Glow Effect -->
          <div class="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>

          <app-button
            variant="primary"
            size="lg"
            (onClick)="triggerFileInput()"
            class="relative w-full bg-gradient-to-r from-emerald-500 to-teal-500 border-2 border-emerald-400/50 text-gray-900 font-bold hover:from-emerald-400 hover:to-teal-400 hover:border-emerald-300/60 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-emerald-900/30"
          >
            <span class="flex items-center justify-center gap-3">
              <!-- GIF Icon -->
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Upload GIF
            </span>
          </app-button>
        </div>
      }

      <!-- Hidden File Input -->
      <input
        #fileInput
        type="file"
        (change)="onFileSelected($event)"
        accept="image/gif"
        class="hidden"
      />

      <!-- GIF Restrictions Info -->
      @if (!selectedGifUrl) {
        <div class="mt-4 p-4 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-700/30 rounded-xl backdrop-blur-sm">
          <div class="text-center">
            <div class="inline-flex items-center gap-2 mb-2 px-3 py-1 bg-emerald-800/40 rounded-full border border-emerald-600/30">
              <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm font-semibold text-emerald-300">GIF Requirements</span>
            </div>

            <ul class="text-xs text-emerald-200/80 space-y-1.5 mt-3 text-left">
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>Only <span class="font-bold text-emerald-300">.gif</span> files supported</span>
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>Maximum size: <span class="font-bold text-emerald-300">10 MB</span></span>
              </li>
            </ul>
          </div>
        </div>
      }
    </div>
  `
})
export class GifPickerComponent {
  @Output() gifSelected = new EventEmitter<string>(); // فقط string (URL)

  selectedGifUrl: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // بررسی نوع فایل
      if (file.type !== 'image/gif') {
        alert('Please select a valid GIF file. Only .gif files are supported.');
        return;
      }

      // بررسی سایز فایل
      if (file.size > this.MAX_FILE_SIZE) {
        alert(`GIF file must be less than ${this.MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
      }

      this.processGifFile(file);
    }
  }

  private processGifFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedGifUrl = e.target?.result as string;
      // فقط URL رو emit کن
      this.gifSelected.emit(this.selectedGifUrl);
    };

    reader.onerror = () => {
      alert('Error reading GIF file. Please try another.');
    };

    reader.readAsDataURL(file);
  }

  removeGif(): void {
    this.selectedGifUrl = null;
    this.gifSelected.emit('');

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  reset(): void {
    this.selectedGifUrl = null;
    this.gifSelected.emit('');

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
