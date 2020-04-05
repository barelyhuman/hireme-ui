import { Notyf } from 'notyf';
const toast = new Notyf({
  position: { x: 'right', y: 'top' },
  duration: 5000,
  dismissible: true,
  types: [
    {
      type: 'success',
      className: 'toast-container',
      background: '#fde5da',
    },
    {
      type: 'error',
      className: 'toast-container',
      background: '#fde5da',
    },
  ],
});
export default toast;
