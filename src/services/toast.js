import { Notyf } from 'notyf';
const toast = new Notyf({
  position: { x: 'right', y: 'top' },
  duration: 5000,
  dismissible: true,
});
export default toast;
