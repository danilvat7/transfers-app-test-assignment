import { FormControl, ValidatorFn } from '@angular/forms';

/**
 * Custom validation functions
 */
export const customValidators = {
  checkBalance(currentBalance: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
      const { value } = control;
      if (value) {
        const featureBalance = currentBalance - value;
        if (featureBalance <= -500) {
          return {
            balance: true,
          };
        }

        return null;
      }

      return null;
    };
  },
};
