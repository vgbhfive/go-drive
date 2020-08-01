import InputDialogInner from './InputDialog.vue'
import showBaseDialog, { createDialog } from '../base-dialog'

const InputDialog = createDialog('InputDialog', InputDialogInner)

export default function showInputDialog (Vue, opts) {
  return showBaseDialog(Vue, InputDialog, { ...opts })
}
