import Swal from 'sweetalert2'

export function useSwal() {
  const showAlert = async (option: object) => await Swal.fire(option)

  const showSuccess = async (message: string) => {
    return await showAlert({
      title: 'Success!',
      text: message,
      icon: 'success',
      position: 'top-end',
      showConfigButton: false,
      timer: 1500,
    })
  }

  const showError = async (message: string) => {
    return await showAlert({
      title: 'Error Encountered!',
      text: message,
      icon: 'error',
      position: 'top-end',
      showConfigButton: false,
      timer: 1500,
    })
  }

  const showConfirm = async (message: string) => {
    return await showAlert({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
  }

  return { showSuccess, showError, showConfirm }
}
