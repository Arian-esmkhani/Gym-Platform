import { Component, inject, signal, ViewChild } from "@angular/core";
import { ToastSeverity } from "../ui/toast.component";
import { ImagePickerComponent } from "../ui/image-picker.component";
import { InputTextarea } from "../ui/input-textarea.component";
import { FieldFloatLabel } from "../ui/label.component";
import { ButtonComponent } from "../ui/button.component";
import { CoachHooks } from "../hooks/use-coach.hook";
import { ApiResponse } from "../type/api-response.type";

@Component({
  selector: 'coach-form',
  standalone: true,
  imports: [
    ImagePickerComponent,
    ButtonComponent,
    InputTextarea,
    FieldFloatLabel,
    ToastSeverity,
  ],
  template: `

<div class="flex flex-col p-8 bg-gradient-to-br from-gray-900 via-zinc-900 to-gray-900 min-h-screen">

  <!-- Header Section -->
  <div class="flex justify-center mb-8">
    <h1 class="text-2xl md:text-3xl font-bold text-slate-300 tracking-wide">New Coach</h1>
  </div>

  <!-- Image Picker Section -->
  <div class="flex justify-center mb-10">
    <app-image-picker
      (imageSelected)="imageUrl.set($event)"
      class="w-full max-w-md">
    </app-image-picker>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">

    <!-- Description Textarea -->
    <div class="xl:col-span-6">
      <app-input-textarea
        (descriptionChange)="description.set($event)"
        class="h-full">
      </app-input-textarea>
    </div>

    <!-- Name Input -->
    <div class="xl:col-span-3 ml-[4vw]">
      <app-label
        (nameChange)="name.set($event)"
        class="h-full">
      </app-label>
    </div>
  </div>

  <!-- Submit Button -->
  <div class="flex justify-center mt-8">
    <app-button
      type="submit"
      variant="primary"
      size="lg"
      class="shadow-lg shadow-rose-900/30 hover:shadow-rose-900/40 transition-all duration-300 transform hover:scale-105"
      (onClick)="onSubmit()"
      [disabled]="loading()">

      @if (loading()) {
        <span class="pi pi-spin pi-spinner mr-2"></span>
        Loading...
      } @else {
        Submit
      }
    </app-button>
  </div>

  <toast-severity></toast-severity>
</div>

  `
})

export class CoachForm {
  imageUrl = signal<string>('');
  description = signal<string>('');
  name = signal<string>('');
  loading = signal<boolean>(false);

  @ViewChild(ToastSeverity) toastService!: ToastSeverity;
  @ViewChild(FieldFloatLabel) nameInput!: FieldFloatLabel;
  @ViewChild(InputTextarea) textarea!: InputTextarea;
  @ViewChild(ImagePickerComponent) imagePicker!: ImagePickerComponent;

  private coachHooks = inject(CoachHooks);

  isFormValid = signal<boolean>(false);

  updateFormValidity(): void {
    const isValid = !!(
      this.name().trim() &&
      this.description().trim() &&
      this.imageUrl()
    );
    this.isFormValid.set(isValid);
  }

  onSubmit() {
    // Update form validity before checking
    this.updateFormValidity();

    if (!this.isFormValid()) {
      this.toastService.showWarn("Please fill all fields");
      return;
    }

    if (this.loading()) {
      return;
    }

    this.loading.set(true);

    const coachData = {
      name: this.name().trim(),
      description: this.description().trim(),
      imgUrl: this.imageUrl()
    };

    this.coachHooks.useSaveCoach()(coachData).subscribe({
      next: (response: ApiResponse<void>) => {
        this.loading.set(false);
        if (response.success) {
          this.toastService.showSuccess(response.message || 'Coach saved successfully');
          this.resetForm();
        } else {
          this.toastService.showError(response.message || 'Failed to save coach');
        }
      },
      error: (error) => {
        this.loading.set(false);
        this.showErrorToast(error.message || 'An error occurred while saving');
      }
    });
  }

  private resetForm(): void {
    this.name.set('');
    this.description.set('');
    this.imageUrl.set('');
    this.isFormValid.set(false);

    // Reset child components if they exist
    if (this.nameInput) this.nameInput.reset();
    if (this.textarea) this.textarea.reset();
    if (this.imagePicker) this.imagePicker.reset();
  }

  private showErrorToast(message: string): void {
    setTimeout(() => {
      if (this.toastService) {
        this.toastService.showError(message);
      }
    }, 100);
  }

  // Listen to signal changes to update form validity
  constructor() {
    // Watch for changes in form fields
    // In a real app, you might use effect() or computed()
    // For simplicity, we'll call updateFormValidity in onSubmit
    // You can also set up individual effects for each signal
  }
}
