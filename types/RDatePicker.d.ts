import { DPData, DPPropGetters } from '@rehookify/datepicker';

export type DatePickerHooks = {
  data: DPData;
  propGetters: DPPropGetters;
};

export type ActiveCalendar = 'date' | 'month' | 'year';